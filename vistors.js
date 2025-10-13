class VisitorTracker {
    constructor() {
        this.storageKey = 'amazighTV_visitor_data';
        this.sessionKey = 'amazighTV_current_session';
        this.init();
    }

    init() {
        this.updateStats();
        this.trackVisit();
    }

    getVisitorData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {
                totalVisits: 0,
                uniqueVisitors: 0,
                returningVisitors: 0,
                lastVisit: null,
                firstVisit: null,
                visitorId: this.generateVisitorId()
            };
        } catch (error) {
            console.error('Erreur lecture données visiteurs:', error);
            return this.getDefaultData();
        }
    }

    getDefaultData() {
        return {
            totalVisits: 0,
            uniqueVisitors: 0,
            returningVisitors: 0,
            lastVisit: null,
            firstVisit: null,
            visitorId: this.generateVisitorId()
        };
    }

    generateVisitorId() {
        return 'visitor_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    saveVisitorData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Erreur sauvegarde données visiteurs:', error);
        }
    }

    isNewSession() {
        const currentSession = sessionStorage.getItem(this.sessionKey);
        if (!currentSession) {
            sessionStorage.setItem(this.sessionKey, Date.now().toString());
            return true;
        }
        return false;
    }

    isNewVisitor(data) {
        return !data.firstVisit;
    }

    shouldCountReturningVisit(data) {
        if (!data.lastVisit) return true;
        
        const lastVisit = new Date(data.lastVisit);
        const currentVisit = new Date();
        const hoursSinceLastVisit = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60));
        
        // Compter comme visite de retour après 1 heure
        return hoursSinceLastVisit >= 1;
    }

    trackVisit() {
        if (!this.isNewSession()) return;

        const now = new Date().toISOString();
        const data = this.getVisitorData();
        
        // Incrémente les visites totales
        data.totalVisits++;
        
        if (this.isNewVisitor(data)) {
            // Premier visite
            data.uniqueVisitors++;
            data.firstVisit = now;
            data.lastVisit = now;
        } else {
            // Visiteur de retour
            if (this.shouldCountReturningVisit(data)) {
                data.returningVisitors++;
            }
            data.lastVisit = now;
        }

        this.saveVisitorData(data);
        this.updateDisplay(data);
        
        // Animation des compteurs
        this.animateCounters(data);
    }

    animateCounters(data) {
        const elements = {
            'total-visits': data.totalVisits,
            'unique-visitors': data.uniqueVisitors,
            'returning-visitors': data.returningVisitors
        };

        Object.entries(elements).forEach(([id, target]) => {
            const element = document.getElementById(id);
            if (!element) return;

            const current = parseInt(element.textContent) || 0;
            this.animateValue(element, current, target, 1000);
        });
    }

    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(start + progress * (end - start));
            element.textContent = this.formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = this.formatNumber(end);
            }
        };
        
        requestAnimationFrame(step);
    }

    updateDisplay(data) {
        const totalElement = document.getElementById('total-visits');
        const uniqueElement = document.getElementById('unique-visitors');
        const returningElement = document.getElementById('returning-visitors');

        if (totalElement) totalElement.textContent = this.formatNumber(data.totalVisits);
        if (uniqueElement) uniqueElement.textContent = this.formatNumber(data.uniqueVisitors);
        if (returningElement) returningElement.textContent = this.formatNumber(data.returningVisitors);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    updateStats() {
        const data = this.getVisitorData();
        this.updateDisplay(data);
    }

    // Méthode pour réinitialiser (utile pour les tests)
    resetStats() {
        localStorage.removeItem(this.storageKey);
        sessionStorage.removeItem(this.sessionKey);
        this.init();
    }

    // Export des données pour analytics
    getStats() {
        return this.getVisitorData();
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.visitorTracker = new VisitorTracker();
});