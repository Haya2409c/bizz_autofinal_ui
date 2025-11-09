"use client";

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { DailyExpense, PaymentMethod, NewExpenseForm } from './types/index';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Input as RawInput } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Download, Plus, FileText, Wallet, CalendarDays, Tag, CreditCard, PenSquare } from 'lucide-react';

const expenseCategories: string[] = ['Fuel', 'Rent', 'Salary', 'Maintenance', 'Office Supplies', 'Transport', 'Marketing'];
const paymentMethods: PaymentMethod[] = ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card'];

export const DailyExpensesContent: React.FC = () => {
  const [expenses, setExpenses] = useState<DailyExpense[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [summary, setSummary] = useState({ today: 0, month: 0, year: 0 });

  const [form, setForm] = useState<NewExpenseForm>({
    date: new Date(),
    amount: '',
    category: '',
    paymentMethod: '',
    description: '',
    receiptFile: null,
  });

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/expenses/all');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: DailyExpense[] = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await fetch('/api/expenses/summary');
      if (!res.ok) return;
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target as HTMLInputElement;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setForm(prev => ({ ...prev, receiptFile: file ?? null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('date', form.date.toISOString());
      fd.append('amount', form.amount);
      fd.append('category', form.category);
      fd.append('paymentMethod', form.paymentMethod);
      fd.append('description', form.description);
      if (form.receiptFile) fd.append('receipt', form.receiptFile);

      const res = await fetch('/api/expenses/add', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Failed to add');
      const added: DailyExpense = await res.json();
      setExpenses(prev => [added, ...prev]);
      setForm({ date: new Date(), amount: '', category: '', paymentMethod: '', description: '', receiptFile: null });
      await fetchSummary();
    } catch (err) {
      console.error(err);
      alert('Failed to add expense');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this expense?')) return;
    try {
      const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      const text = await res.text().catch(() => '');
      console.log('[frontend] DELETE /api/expenses/', id, 'status=', res.status, 'body=', text);
      if (!res.ok) {
        // try to parse JSON body for error message
        let msg = `Server returned ${res.status}`;
        try {
          const json = JSON.parse(text || '{}');
          if (json?.error) msg = String(json.error);
          else if (json?.message) msg = String(json.message);
        } catch (e) {
          // not JSON
          if (text) msg = text;
        }
        throw new Error(msg);
      }
      setExpenses(prev => prev.filter(p => p.id !== id));
      await fetchSummary();
    } catch (err) {
      console.error('[frontend] delete error:', err);
      alert('Failed to delete: ' + String(err));
    }
  };

  const filtered = expenses.filter(e => {
    if (!search) return true;
    const s = search.toLowerCase();
    return [e.description, e.category, e.paymentMethod, e.date.toString()].join(' ').toLowerCase().includes(s);
  });

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6 mr-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Expense Management</h2>
          <p className="text-sm text-muted-foreground">Track and manage business expenses</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-9" onClick={() => window.open('/api/expenses/export?format=csv')}>
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 sm:flex-none h-9" onClick={() => window.open('/api/expenses/export?format=pdf')}>
            <FileText className="w-4 h-4 mr-2" /> Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mr-5">
        <Card className="p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-base sm:text-lg font-bold truncate">Rs {summary.today}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-base sm:text-lg font-bold truncate">Rs {summary.month}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">This Year</p>
              <p className="text-base sm:text-lg font-bold truncate">Rs {summary.year}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="w-full">
            <p className="text-sm text-muted-foreground mb-2">Actions</p>
            <Button size="sm" className="w-full h-8 sm:h-9" onClick={() => alert('Send via WhatsApp not implemented')}>
              Send (WhatsApp)
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mr-4">
      <Card className="p-3 sm:p-4 lg:col-span-1">
  <h3 className="font-semibold mb-3 text-base sm:text-lg">Add New Expense</h3>
  <form onSubmit={handleSubmit} className="space-y-3">
    <div className="flex flex-col space-y-1.5 w-full">
      <label className="text-sm font-medium">Title</label>
      <Input id="description" value={form.description} onChange={handleInput} placeholder="Fuel for delivery truck" className="h-9 sm:h-10 w-full" />
    </div>

    <div className="flex flex-col space-y-1.5 w-full">

  <label className="text-sm font-medium">Category</label>
  <Select
    onValueChange={(val) => setForm(prev => ({ ...prev, category: val }))}
  >
    <SelectTrigger className="h-9 sm:h-10 w-full text-sm">
      <SelectValue placeholder="Select category" />
    </SelectTrigger>
    <SelectContent className="max-h-52">
      {expenseCategories.map(cat => (
        <SelectItem
          key={cat}
          value={cat}
          className="text-sm px-2 py-1 hover:bg-accent"
        >
          {cat}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

    <div className="flex flex-col space-y-1.5 w-full">
      <label className="text-sm font-medium">Amount</label>
      <Input id="amount" type="number" value={form.amount} onChange={handleInput} placeholder="5000" className="w-full" />
    </div>

    <div className="flex flex-col space-y-1.5 w-full">
      <label className="text-sm font-medium">Date</label>
      <DatePicker selected={form.date} onChange={(d) => setForm(prev => ({ ...prev, date: d ?? new Date() }))} className="w-full p-2 border rounded mt-1" />
    </div>
    

    <div className="flex flex-col space-y-1.5 w-full">
      <label className="text-sm font-medium">Payment Method</label>
      <Select onValueChange={(val) => setForm(prev => ({ ...prev, paymentMethod: val }))}>
        <SelectTrigger className="w-full h-9 sm:h-10">
          <SelectValue placeholder="Select method" />
        </SelectTrigger>
        <SelectContent>
          {paymentMethods.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>

<div className="flex flex-col space-y-1.5 w-full">
  <label htmlFor="description" className="text-sm font-medium">
    Description
  </label>
  <Input
    id="description"
    value={form.description}
    onChange={handleInput}
    placeholder="Enter expense description"
    className="w-full p-2 border rounded mt-1 text-sm"
  />
</div>

    {/* Attachment */}
    <div className="flex flex-col space-y-1.5 w-full">
      <label className="text-sm font-medium text-muted-foreground">Attachment</label>
      <label htmlFor="receiptFile" className="flex items-center justify-between border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 cursor-pointer bg-background hover:bg-gray-100 dark:hover:bg-gray-800 transition w-full">
        <span className="text-sm text-muted-foreground truncate">{form.receiptFile ? form.receiptFile.name : "Choose a file (.pdf, .jpg, .png)"}</span>
        <Plus className="w-4 h-4 text-muted-foreground" />
        <input id="receiptFile" type="file" onChange={handleFile} accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
      </label>
      {form.receiptFile && (
        <button type="button" onClick={() => setForm({ ...form, receiptFile: null })} className="mt-1 text-xs text-red-500 hover:underline w-fit">
          Remove file
        </button>
      )}
    </div>

    <div className="flex justify-end">
      <Button type="submit" className="w-full sm:w-auto"><Plus className="w-4 h-4 mr-2" /> Add Expense</Button>
    </div>
  </form>
</Card>


        <Card className="p-3 sm:p-4 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="flex w-full">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search expenses..."
                className="h-9 sm:h-10 flex-1"
              />
              <Button variant="outline" size="sm" className="h-9 sm:h-10 px-4 ml-2">
                <Tag className="w-4 h-4 mr-2" /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <table className="w-full text-sm">
                
              <thead className="text-xs text-muted-foreground">
                <tr>
                  <th className="text-left p-2 sm:p-3">Date</th>
                  <th className="text-left p-2 sm:p-3">Description</th>
                  <th className="text-left p-2 sm:p-3 hidden sm:table-cell">Category</th>
                  <th className="text-left p-2 sm:p-3">Amount</th>
                  <th className="text-left p-2 sm:p-3 hidden sm:table-cell">Payment</th>
                  <th className="text-center p-2 sm:p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={6} className="p-4">Loading...</td></tr>}
                {!loading && filtered.map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-2 sm:p-3 whitespace-nowrap">{exp.date}</td>
                    <td className="p-2 sm:p-3">
                      <div className="flex flex-col sm:hidden">
                        <span className="font-medium">{exp.description}</span>
                        <span className="text-xs text-muted-foreground">{exp.category}</span>
                      </div>
                      <span className="hidden sm:inline">{exp.description}</span>
                    </td>
                    <td className="p-2 sm:p-3 hidden sm:table-cell">{exp.category}</td>
                    <td className="p-2 sm:p-3 whitespace-nowrap">Rs {exp.amount.toFixed(2)}</td>
                    <td className="p-2 sm:p-3 hidden sm:table-cell">{exp.paymentMethod}</td>
                    <td className="p-2 sm:p-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><PenSquare className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(exp.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && filtered.length === 0 && <tr><td colSpan={6} className="p-4">No expenses found</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};


