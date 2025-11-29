import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Plus, 
  Eye, 
  EyeOff,
  Copy,
  Trash2,
  Check,
  Lock,
  Shield,
  Sparkles,
  Snowflake
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VirtualCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  type: 'virtual' | 'physical' | 'temporary';
  status: 'active' | 'blocked' | 'frozen' | 'expired';
  balance: number;
  color: string;
  expiresAt?: string;
}


const CardsPage: React.FC = () => {
  const [showCardDetails, setShowCardDetails] = useState<{ [key: string]: boolean }>({});
  const [showCVV, setShowCVV] = useState<{ [key: string]: boolean }>({});
  const [requestingCard, setRequestingCard] = useState(false);
  const [cardType, setCardType] = useState<'virtual' | 'physical'>('virtual');
  const [cardName, setCardName] = useState('');
  const [activeTab, setActiveTab] = useState<'cards' | 'create'>('cards');

  const [cards, setCards] = useState<VirtualCard[]>([
    {
      id: '1',
      cardNumber: '4532 1234 5678 9010',
      cardHolder: 'AISHA MAIDAMI',
      expiryDate: '12/25',
      cvv: '123',
      type: 'virtual',
      status: 'active',
      balance: 5000,
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: '2',
      cardNumber: '5234 5678 9012 3456',
      cardHolder: 'AISHA MAIDAMI',
      expiryDate: '09/24',
      cvv: '456',
      type: 'virtual',
      status: 'active',
      balance: 2500,
      color: 'from-purple-600 to-purple-800'
    }
  ]);


  const toggleCardDetails = (cardId: string) => {
    setShowCardDetails(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const toggleCVV = (cardId: string) => {
    setShowCVV(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const maskCardNumber = (number: string) => {
    return number.replace(/\d{4}(?= \d{4})/g, '****');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleRequestCard = () => {
    if (!cardName.trim()) return;
    
    setRequestingCard(true);
    setTimeout(() => {
      const newCard: VirtualCard = {
        id: Date.now().toString(),
        cardNumber: `${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
        cardHolder: cardName.toUpperCase(),
        expiryDate: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/${String(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).slice(-2)}`,
        cvv: String(Math.floor(100 + Math.random() * 900)),
        type: cardType,
        status: 'active',
        balance: 0,
        color: cardType === 'virtual' ? 'from-green-600 to-green-800' : 'from-orange-600 to-orange-800'
      };
      
      setCards(prev => [newCard, ...prev]);
      setRequestingCard(false);
      setCardName('');
      setCardType('virtual');
    }, 1500);
  };

  const handleFreezeCard = (cardId: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, status: card.status === 'frozen' ? 'active' : 'frozen' }
        : card
    ));
  };

  const handleBlockCard = (cardId: string) => {
    if (confirm('Are you sure you want to permanently block this card? This action cannot be undone.')) {
      setCards(prev => prev.map(card => 
        card.id === cardId 
          ? { ...card, status: 'blocked' }
          : card
      ));
    }
  };

  const handleUnblockCard = (cardId: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, status: 'active' }
        : card
    ));
  };


  const handleDeleteCard = (cardId: string) => {
    if (confirm('Are you sure you want to delete this card?')) {
      setCards(prev => prev.filter(card => card.id !== cardId));
    }
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-12 pb-6 px-4">
        <h1 className="text-2xl font-bold mb-2">My Cards</h1>
        <p className="text-blue-100 text-sm">Manage your virtual and physical cards</p>
      </div>

      {/* Tabs */}
      <div className="px-4 -mt-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
            <TabsTrigger value="cards" className="text-xs">
              <CreditCard className="h-4 w-4 mr-1" />
              My Cards
            </TabsTrigger>
            <TabsTrigger value="create" className="text-xs">
              <Plus className="h-4 w-4 mr-1" />
              Create New Card
            </TabsTrigger>
          </TabsList>

          {/* Cards Tab */}
          <TabsContent value="cards" className="mt-6 space-y-6">
            {/* Cards List */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Cards ({cards.length})</h2>
              
              {cards.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 mb-2">No cards yet</p>
                    <p className="text-sm text-gray-400">Request your first card to get started</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {cards.map((card) => (
                    <div key={card.id} className="relative">
                      {/* Virtual Card Display */}
                      <div className={cn(
                        "relative overflow-hidden rounded-2xl p-6 text-white shadow-xl",
                        `bg-gradient-to-br ${card.color}`,
                        (card.status === 'frozen' || card.status === 'blocked') && "opacity-75"
                      )}>
                        {/* Card Pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                        
                        <div className="relative z-10">
                          {/* Card Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                              <Shield className="h-5 w-5" />
                              <span className="text-xs font-medium opacity-90">
                                {card.type === 'virtual' ? 'Virtual Card' : card.type === 'temporary' ? 'Temporary Card' : 'Physical Card'}
                              </span>
                            </div>
                            {card.status === 'blocked' && (
                              <div className="bg-red-500/20 px-2 py-1 rounded text-xs font-medium">
                                Blocked
                              </div>
                            )}
                            {card.status === 'frozen' && (
                              <div className="bg-blue-500/20 px-2 py-1 rounded text-xs font-medium">
                                Frozen
                              </div>
                            )}
                            {card.type === 'temporary' && card.expiresAt && (
                              <div className="bg-orange-500/20 px-2 py-1 rounded text-xs font-medium">
                                <Clock className="h-3 w-3 inline mr-1" />
                                Expires {new Date(card.expiresAt).toLocaleDateString()}
                              </div>
                            )}
                          </div>

                          {/* Card Number */}
                          <div className="mb-4">
                            <p className="text-xs opacity-75 mb-2">Card Number</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xl font-mono tracking-wider">
                                {showCardDetails[card.id] 
                                  ? card.cardNumber 
                                  : maskCardNumber(card.cardNumber)}
                              </p>
                              <button
                                onClick={() => toggleCardDetails(card.id)}
                                className="p-1 hover:bg-white/20 rounded"
                              >
                                {showCardDetails[card.id] ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Card Details */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs opacity-75 mb-1">Card Holder</p>
                              <p className="text-sm font-semibold">{card.cardHolder}</p>
                            </div>
                            <div>
                              <p className="text-xs opacity-75 mb-1">Expires</p>
                              <p className="text-sm font-semibold">{card.expiryDate}</p>
                            </div>
                            <div>
                              <p className="text-xs opacity-75 mb-1">CVV</p>
                              <div className="flex items-center gap-1">
                                <p className="text-sm font-semibold">
                                  {showCVV[card.id] ? card.cvv : '***'}
                                </p>
                                <button
                                  onClick={() => toggleCVV(card.id)}
                                  className="p-0.5 hover:bg-white/20 rounded"
                                >
                                  {showCVV[card.id] ? (
                                    <EyeOff className="h-3 w-3" />
                                  ) : (
                                    <Eye className="h-3 w-3" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Card Balance */}
                          <div className="mt-6 pt-4 border-t border-white/20">
                            <p className="text-xs opacity-75 mb-1">Available Balance</p>
                            <p className="text-2xl font-bold">₦{card.balance.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <Card className="mt-3">
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(card.cardNumber)}
                              className="flex-1"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleFreezeCard(card.id)}
                              className={cn(
                                "flex-1",
                                card.status === 'frozen' && "bg-blue-50 text-blue-600 border-blue-200"
                              )}
                            >
                              {card.status === 'frozen' ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Unfreeze
                                </>
                              ) : (
                                <>
                                  <Snowflake className="h-4 w-4 mr-1" />
                                  Freeze
                                </>
                              )}
                            </Button>
                            {card.status === 'blocked' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUnblockCard(card.id)}
                                className="flex-1 bg-green-50 text-green-600 border-green-200"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Unblock
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBlockCard(card.id)}
                                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Lock className="h-4 w-4 mr-1" />
                                Block
                              </Button>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCard(card.id)}
                            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete Card
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Create New Card Tab */}
          <TabsContent value="create" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Card
                </CardTitle>
                <CardDescription>
                  Get a new virtual or physical card instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Card Name</Label>
                  <Input
                    id="cardName"
                    placeholder="Enter name for card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">This name will appear on your card</p>
                </div>

                <div>
                  <Label>Card Type</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                      onClick={() => setCardType('virtual')}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all hover:scale-105",
                        cardType === 'virtual'
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 bg-white"
                      )}
                    >
                      <CreditCard className={cn(
                        "h-6 w-6 mx-auto mb-2",
                        cardType === 'virtual' ? "text-blue-600" : "text-gray-400"
                      )} />
                      <p className={cn(
                        "text-sm font-medium",
                        cardType === 'virtual' ? "text-blue-600" : "text-gray-600"
                      )}>
                        Virtual Card
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Instant</p>
                      <p className="text-xs text-gray-400 mt-1">For online purchases</p>
                    </button>

                    <button
                      onClick={() => setCardType('physical')}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all hover:scale-105",
                        cardType === 'physical'
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 bg-white"
                      )}
                    >
                      <CreditCard className={cn(
                        "h-6 w-6 mx-auto mb-2",
                        cardType === 'physical' ? "text-blue-600" : "text-gray-400"
                      )} />
                      <p className={cn(
                        "text-sm font-medium",
                        cardType === 'physical' ? "text-blue-600" : "text-gray-600"
                      )}>
                        Physical Card
                      </p>
                      <p className="text-xs text-gray-500 mt-1">5-7 days</p>
                      <p className="text-xs text-gray-400 mt-1">Delivered to your address</p>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Secure & Protected</p>
                      <p>Your card is secured with industry-standard encryption. Virtual cards are perfect for online shopping, while physical cards can be used anywhere.</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleRequestCard}
                  disabled={!cardName.trim() || requestingCard}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
                >
                  {requestingCard ? (
                    <>
                      <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                      Creating Card...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 mr-2" />
                      Create Card
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
};

export default CardsPage;
