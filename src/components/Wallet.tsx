import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Banknote, Wallet as WalletIcon, Plus } from 'lucide-react';

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [topupAmount, setTopupAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleTopup = () => {
    const amount = parseFloat(topupAmount);
    if (amount > 0) {
      // This would integrate with Flutterwave/Paystack
      console.log(`Processing ${paymentMethod} payment of ₦${amount}`);
      setBalance(prev => prev + amount);
      setTopupAmount('');
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your E-star Wallet</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Top up your wallet for seamless rides and parcel deliveries. Pay with card or bank transfer.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                <WalletIcon className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-2xl">Wallet Balance</CardTitle>
              <CardDescription className="text-3xl font-bold text-green-600 mt-2">
                ₦{balance.toLocaleString()}
              </CardDescription>
            </CardHeader>
          </Card>

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
            <CardContent>
              <div className="space-y-6">
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
                      Bank Transfer
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Pay securely with your debit/credit card via Flutterwave
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="bank" className="space-y-4">
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Wallet;