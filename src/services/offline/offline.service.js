/**
 * 📶 Offline Service - Supporto Offline
 */

class OfflineService {
    constructor() {
        this.queue = [];
        this.cache = new Map();
        this.isOnline = navigator.onLine;
        this.init();
    }

    // Inizializza
    init() {
        // Ascolta eventi online/offline
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processQueue();
            console.log('📶 Connessione ripristinata');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('📶 Connessione persa');
        });

        // Carica cache dal localStorage
        this.loadCache();
    }

    // Carica cache
    loadCache() {
        try {
            const cached = localStorage.getItem('myzubster_cache');
            if (cached) {
                const data = JSON.parse(cached);
                Object.entries(data).forEach(([key, value]) => {
                    this.cache.set(key, value);
                });
            }
        } catch (error) {
            console.error('❌ Errore caricamento cache:', error);
        }
    }

    // Salva cache
    saveCache() {
        try {
            const data = Object.fromEntries(this.cache);
            localStorage.setItem('myzubster_cache', JSON.stringify(data));
        } catch (error) {
            console.error('❌ Errore salvataggio cache:', error);
        }
    }

    // Aggiungi a cache
    async cacheData(key, data) {
        try {
            this.cache.set(key, {
                data: data,
                timestamp: Date.now()
            });
            this.saveCache();
            return true;
        } catch (error) {
            console.error('❌ Errore cacheData:', error);
            return false;
        }
    }

    // Ottieni da cache
    async getCachedData(key, maxAge = 3600000) {
        try {
            const cached = this.cache.get(key);
            if (!cached) return null;
            
            const age = Date.now() - cached.timestamp;
            if (age > maxAge) {
                this.cache.delete(key);
                this.saveCache();
                return null;
            }
            
            return cached.data;
        } catch (error) {
            console.error('❌ Errore getCachedData:', error);
            return null;
        }
    }

    // Aggiungi a queue (offline)
    async queueRequest(endpoint, method, data) {
        try {
            const request = {
                id: `req_${Date.now()}`,
                endpoint: endpoint,
                method: method,
                data: data,
                timestamp: Date.now(),
                attempts: 0
            };
            this.queue.push(request);
            this.saveQueue();
            return true;
        } catch (error) {
            console.error('❌ Errore queueRequest:', error);
            return false;
        }
    }

    // Salva queue
    saveQueue() {
        try {
            localStorage.setItem('myzubster_queue', JSON.stringify(this.queue));
        } catch (error) {
            console.error('❌ Errore salvataggio queue:', error);
        }
    }

    // Carica queue
    loadQueue() {
        try {
            const saved = localStorage.getItem('myzubster_queue');
            if (saved) {
                this.queue = JSON.parse(saved);
            }
        } catch (error) {
            console.error('❌ Errore caricamento queue:', error);
        }
    }

    // Processa queue (online)
    async processQueue() {
        if (!this.isOnline || this.queue.length === 0) return;

        const toProcess = [...this.queue];
        this.queue = [];
        this.saveQueue();

        for (const request of toProcess) {
            try {
                await this.executeRequest(request);
                console.log(`✅ Richiesta ${request.id} elaborata`);
            } catch (error) {
                console.error(`❌ Errore richiesta ${request.id}:`, error);
                // Rimetti in queue
                request.attempts += 1;
                if (request.attempts < 3) {
                    this.queue.push(request);
                    this.saveQueue();
                }
            }
        }
    }

    // Esegui richiesta
    async executeRequest(request) {
        const response = await fetch(request.endpoint, {
            method: request.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request.data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        return response.json();
    }

    // Ottieni status offline
    async getStatus() {
        return {
            isOnline: this.isOnline,
            queueSize: this.queue.length,
            cacheSize: this.cache.size
        };
    }

    // Sync data quando online
    async syncData() {
        if (this.isOnline) {
            await this.processQueue();
            return {
                success: true,
                message: '✅ Dati sincronizzati',
                queueSize: this.queue.length
            };
        }
        return {
            success: false,
            message: '❌ Offline - impossibile sincronizzare'
        };
    }
}

export const offlineService = new OfflineService();

// Carica queue all'avvio
offlineService.loadQueue();
