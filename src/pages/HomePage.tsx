import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet as WalletIcon, 
  Plus, 
  CreditCard, 
  Banknote,
  Receipt,
  History,
  ArrowRight,
  ArrowLeftRight,
  Zap,
  Wifi,
  Droplet,
  Phone,
  Tv,
  GraduationCap,
  Shield,
  Home as HomeIcon,
  Eye,
  EyeOff
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const HomePage: React.FC = () => {
  const [balance, setBalance] = useState(5000);
  const [showBalance, setShowBalance] = useState(true);
  const [topupAmount, setTopupAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [activeSection, setActiveSection] = useState<'wallet' | 'transfer' | 'bills' | 'history'>('wallet');
  
  // Transfer state
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientBank, setRecipientBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [transferNote, setTransferNote] = useState('');
  const [transferring, setTransferring] = useState(false);

  const handleTopup = () => {
    const amount = parseFloat(topupAmount);
    if (amount > 0) {
      setBalance(prev => prev + amount);
      setTopupAmount('');
    }
  };

  const banks = [
    'Access Bank', 'First Bank', 'GTBank', 'UBA', 'Zenith Bank', 
    'Fidelity Bank', 'Union Bank', 'Stanbic IBTC', 'Ecobank', 'FCMB',
    'Wema Bank', 'Sterling Bank', 'Polaris Bank', 'Jaiz Bank', 'Providus Bank'
  ];

  const billCategories = [
    { id: 'electricity', name: 'Electricity', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'internet', name: 'Internet', icon: Wifi, color: 'bg-blue-100 text-blue-600' },
    { id: 'water', name: 'Water', icon: Droplet, color: 'bg-cyan-100 text-cyan-600' },
    { id: 'airtime', name: 'Airtime', icon: Phone, color: 'bg-green-100 text-green-600' },
    { id: 'cable', name: 'Cable TV', icon: Tv, color: 'bg-purple-100 text-purple-600' },
    { id: 'education', name: 'Education', icon: GraduationCap, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'insurance', name: 'Insurance', icon: Shield, color: 'bg-red-100 text-red-600' },
    { id: 'rent', name: 'Rent', icon: HomeIcon, color: 'bg-orange-100 text-orange-600' },
  ];

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (amount > 0 && amount <= balance && recipientBank && accountNumber) {
      setTransferring(true);
      // Simulate API call
      setTimeout(() => {
        setBalance(prev => prev - amount);
        setTransferAmount('');
        setRecipientBank('');
        setAccountNumber('');
        setAccountName('');
        setTransferNote('');
        setTransferring(false);
        alert(`Successfully transferred ₦${amount.toLocaleString()} to ${accountName || accountNumber}`);
      }, 2000);
    }
  };

  const recentTransactions = [
    { id: 1, type: 'ride', description: 'Ride to Monday Market', amount: -500, date: '2024-01-15', time: '10:30 AM' },
    { id: 2, type: 'transfer', description: 'Transfer to Aisha Maidami', amount: -2000, date: '2024-01-15', time: '9:15 AM' },
    { id: 3, type: 'topup', description: 'Wallet Top-up', amount: 5000, date: '2024-01-14', time: '2:15 PM' },
    { id: 4, type: 'ride', description: 'Ride to University', amount: -800, date: '2024-01-14', time: '8:45 AM' },
    { id: 5, type: 'bills', description: 'Electricity Bill', amount: -1500, date: '2024-01-13', time: '4:20 PM' },
    { id: 6, type: 'bills', description: 'Cable TV Subscription', amount: -2500, date: '2024-01-12', time: '3:00 PM' },
  ];

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-12 pb-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm">Good Morning</p>
            <h1 className="text-2xl font-bold">Borno Express</h1>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <WalletIcon className="h-6 w-6" />
          </div>
        </div>
        
        {/* Wallet Balance Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-100 text-sm">Wallet Balance</p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                aria-label={showBalance ? 'Hide balance' : 'Show balance'}
              >
                {showBalance ? (
                  <EyeOff className="h-5 w-5 text-blue-100" />
                ) : (
                  <Eye className="h-5 w-5 text-blue-100" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              {showBalance ? (
                <p className="text-3xl font-bold">₦{balance.toLocaleString()}</p>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-16 bg-white/30 rounded animate-pulse"></div>
                  <div className="h-8 w-12 bg-white/30 rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-white/30 rounded animate-pulse"></div>
                </div>
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center justify-between text-xs text-blue-100">
                <span>Available Balance</span>
                <span className="font-medium">
                  {showBalance ? `₦${balance.toLocaleString()}` : '••••••'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="px-4 -mt-4">
        <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as typeof activeSection)}>
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="wallet" className="text-xs">
              <WalletIcon className="h-4 w-4 mr-1" />
              Wallet
            </TabsTrigger>
            <TabsTrigger value="transfer" className="text-xs">
              <ArrowLeftRight className="h-4 w-4 mr-1" />
              Transfer
            </TabsTrigger>
            <TabsTrigger value="bills" className="text-xs">
              <Receipt className="h-4 w-4 mr-1" />
              Bills
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs">
              <History className="h-4 w-4 mr-1" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Top Up Wallet
                </CardTitle>
                <CardDescription>
                  Add money to your wallet using your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="bank" className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      Bank
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="mt-4">
                    <p className="text-sm text-gray-600">
                      Pay securely with your debit/credit card via Flutterwave
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="bank" className="mt-4">
                    <p className="text-sm text-gray-600">
                      Transfer directly from your bank account via Paystack
                    </p>
                  </TabsContent>
                </Tabs>

                <Button 
                  onClick={handleTopup} 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  disabled={!topupAmount || parseFloat(topupAmount) <= 0}
                >
                  Top Up ₦{topupAmount || '0'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transfer Tab */}
          <TabsContent value="transfer" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowLeftRight className="h-5 w-5" />
                  Transfer to Bank
                </CardTitle>
                <CardDescription>
                  Send money to any Nigerian bank account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="transferAmount">Amount (₦)</Label>
                  <Input
                    id="transferAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="mt-2"
                  />
                  {transferAmount && parseFloat(transferAmount) > balance && (
                    <p className="text-xs text-red-500 mt-1">
                      Insufficient balance. Available: ₦{balance.toLocaleString()}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="recipientBank">Select Bank</Label>
                  <Select value={recipientBank} onValueChange={setRecipientBank}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    placeholder="Enter 10-digit account number"
                    value={accountNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setAccountNumber(value);
                      // In real app, verify account name via API
                      if (value.length === 10) {
                        setAccountName('Account Name'); // Placeholder
                      }
                    }}
                    className="mt-2"
                    maxLength={10}
                  />
                </div>

                {accountNumber.length === 10 && accountName && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-600 mb-1">Account Name</p>
                    <p className="font-semibold text-green-700">{accountName}</p>
                  </div>
                )}

                <div>
                  <Label htmlFor="transferNote">Transfer Note (Optional)</Label>
                  <Textarea
                    id="transferNote"
                    placeholder="Add a note for this transfer"
                    value={transferNote}
                    onChange={(e) => setTransferNote(e.target.value)}
                    className="mt-2"
                    rows={2}
                  />
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Transfer Fee:</span>
                    <span className="font-semibold">₦0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-lg">
                      ₦{transferAmount ? parseFloat(transferAmount).toLocaleString() : '0'}
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={handleTransfer}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  disabled={
                    !transferAmount || 
                    parseFloat(transferAmount) <= 0 || 
                    parseFloat(transferAmount) > balance ||
                    !recipientBank ||
                    accountNumber.length !== 10 ||
                    transferring
                  }
                >
                  {transferring ? (
                    <>
                      <ArrowLeftRight className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ArrowLeftRight className="h-4 w-4 mr-2" />
                      Transfer Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bills Payment Tab */}
          <TabsContent value="bills" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pay Bills</CardTitle>
                <CardDescription>
                  Pay your utility bills quickly and securely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {billCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        className={`${category.color} p-4 rounded-lg flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform active:scale-95`}
                      >
                        <Icon className="h-7 w-7" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View your recent transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.amount > 0 ? (
                            <Plus className="h-5 w-5" />
                          ) : (
                            <ArrowRight className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">
                            {transaction.date} • {transaction.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;

