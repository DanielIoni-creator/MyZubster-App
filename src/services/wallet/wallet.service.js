/**
 * 👛 Wallet Service - Gestione Wallet
 */

class WalletService {
    constructor() {
        this.wallets = new Map();
        this.transactions = [];
        this.initWallets();
    }

    // Inizializza wallet
    initWallets() {
        // Wallet MYZ
        this.wallets.set('myz', {
            id: 'myz_77d6ddd05bf30e8fef178ac1b5b5e112',
            currency: 'MYZ',
            balance: 14876.4,
            address: 'myz_77d6ddd05bf30e8fef178ac1b5b5e112',
            transactions: []
        });

        // Wallet XMR
        this.wallets.set('xmr', {
            id: 'xmr_641340aa6aa86029e833a5e5f5fb2b31',
            currency: 'XMR',
            balance: 0,
            address: 'xmr_641340aa6aa86029e833a5e5f5fb2b31',
            transactions: []
        });

        // Transazioni di esempio
        this.transactions = [
            {
                id: 'tx_1',
                type: 'receive',
                amount: 25,
                currency: 'MYZ',
                from: '0x123...',
                status: 'completed',
                timestamp: new Date().toISOString(),
                description: 'Pagamento ricevuto'
            },
            {
                id: 'tx_2',
                type: 'send',
                amount: 5,
                currency: 'MYZ',
                to: '0x456...',
                status: 'pending',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                description: 'Pagamento inviato'
            }
        ];
    }

    // Ottieni saldo
    async getBalance(currency) {
        try {
            const wallet = this.wallets.get(currency);
            if (!wallet) {
                throw new Error(`Wallet ${currency} non trovato`);
            }
            return {
                success: true,
                balance: wallet.balance,
                currency: wallet.currency,
                address: wallet.address
            };
        } catch (error) {
            console.error('❌ Errore getBalance:', error);
            return { success: false, error: error.message };
        }
    }

    // Ottieni transazioni
    async getTransactions(currency, limit = 10) {
        try {
            const filtered = this.transactions
                .filter(t => t.currency === currency)
                .slice(-limit);
            return {
                success: true,
                transactions: filtered,
                total: filtered.length
            };
        } catch (error) {
            console.error('❌ Errore getTransactions:', error);
            return { success: false, error: error.message };
        }
    }

    // Crea pagamento
    async createPayment(amount, currency, description) {
        try {
            const payment = {
                id: `pay_${Date.now()}`,
                amount: amount,
                currency: currency,
                description: description || 'Pagamento MyZubster',
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            // Aggiungi transazione
            this.transactions.push({
                id: `tx_${Date.now()}`,
                type: 'send',
                amount: amount,
                currency: currency,
                status: 'pending',
                timestamp: new Date().toISOString(),
                description: description || 'Pagamento'
            });

            return {
                success: true,
                payment: payment,
                message: '💰 Pagamento creato con successo'
            };
        } catch (error) {
            console.error('❌ Errore createPayment:', error);
            return { success: false, error: error.message };
        }
    }

    // QR Code per pagamento
    async generateQR(amount, currency) {
        try {
            const data = {
                address: this.wallets.get(currency)?.address,
                amount: amount,
                currency: currency,
                timestamp: new Date().toISOString()
            };
            return {
                success: true,
                qrData: JSON.stringify(data),
                address: data.address
            };
        } catch (error) {
            console.error('❌ Errore generateQR:', error);
            return { success: false, error: error.message };
        }
    }

    // Sincronizza wallet
    async syncWallet(currency) {
        try {
            // Simula sincronizzazione
            const wallet = this.wallets.get(currency);
            if (!wallet) {
                throw new Error(`Wallet ${currency} non trovato`);
            }
            
            // Aggiorna saldo
            wallet.balance += Math.random() * 10;
            
            return {
                success: true,
                message: `✅ Wallet ${currency} sincronizzato`,
                balance: wallet.balance
            };
        } catch (error) {
            console.error('❌ Errore syncWallet:', error);
            return { success: false, error: error.message };
        }
    }
}

export const walletService = new WalletService();
