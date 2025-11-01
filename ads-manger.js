// ads-manager.js - À placer dans le dossier principal
class AdsManager {
    constructor() {
        this.lowCPMCountries = ['DZ', 'MA', 'TN', 'LY', 'EG', 'NG', 'SN', 'CI', 'KE', 'ZA', 'GH', 'UG', 'ET'];
        this.highCPMCountries = ['FR', 'DE', 'US', 'CA', 'GB', 'IT', 'ES', 'NL', 'BE', 'CH', 'SE', 'NO', 'AU'];
        
        // CONFIGURATION DES CODES PUB PAR PAGE - SIMPLIFIÉE
        this.adsConfig = {
            // PAGE D'ACCUEIL
            'index.html': {
                lowCPM: {
                    socialbar: '31c49ce66a7cc87dbcb332ef3d028acb'
                },
                highCPM: {
                    socialbar: '1a848bcee8d4bae2bf2bd81b1d7c5873'
                }
            },
            
            // PAGE CATALOGUE
            'films.html': {
                lowCPM: {
                    socialbar: '31c49ce66a7cc87dbcb332ef3d028acb'
                },
                highCPM: {
                    socialbar: '1a848bcee8d4bae2bf2bd81b1d7c5873'
                }
            },
            
            // PAGES FILMS
            'crek1.html': {
                lowCPM: {
                    popunder: '33f1e7c6d75e2f682e23c1b808298345',
                    socialbar: 'e7b181338eaa06b685207f96248c8503'
                },
                highCPM: {
                    popunder: '31e35007374249b8ff4b29d59023c901',
                    socialbar: '64a43db18adc60ad084e70f6cf2320b0'
                }
            },
            
            'qiq1.html': {
                lowCPM: {
                    popunder: '33f1e7c6d75e2f682e23c1b808298345',
                    socialbar: 'e7b181338eaa06b685207f96248c8503'
                },
                highCPM: {
                    popunder: '31e35007374249b8ff4b29d59023c901',
                    socialbar: '64a43db18adc60ad084e70f6cf2320b0'
                }
            },

            'limucucu1.html': {
                lowCPM: {
                    popunder: 'd575c843848496f1953b8976c8fb3699',
                    socialbar: 'a1a2f3e477b00d7ba5af25a4d1a70d86'
                },
                highCPM: {
                    popunder: '2fd98a043f3b6e5e13801758f641d1ed',
                    socialbar: 'f7446a9645e376ef3a15c6fdafc9adc3'
                }
            },
            
            'limucucu2.html': {
                lowCPM: {
                    popunder: 'd575c843848496f1953b8976c8fb3699',
                    socialbar: 'a1a2f3e477b00d7ba5af25a4d1a70d86'
                },
                highCPM: {
                    popunder: '2fd98a043f3b6e5e13801758f641d1ed',
                    socialbar: 'f7446a9645e376ef3a15c6fdafc9adc3'
                }
            },

            'narnia1.html': {
                lowCPM: {
                    popunder: 'c368d4070317dd34c662d9be76de6991',
                    socialbar: 'e14cf2faff0ae082f33320f37b42bc48'
                },
                highCPM: {
                    popunder: 'e6741100cf4581e3832806de7f4d3142',
                    socialbar: 'd27f787ad701664d297cc3b8663127f3'
                }
            },
            
            'narnia2.html': {
                lowCPM: {
                    popunder: 'c368d4070317dd34c662d9be76de6991',
                    socialbar: 'e14cf2faff0ae082f33320f37b42bc48'
                },
                highCPM: {
                    popunder: 'e6741100cf4581e3832806de7f4d3142',
                    socialbar: 'd27f787ad701664d297cc3b8663127f3'
                }
            },
            
            'pucci1.html': {
                lowCPM: {
                    popunder: 'a06afd1b91c7859c505a158626b21ab5',
                    socialbar: 'e644c95728921f21f50be95a8e83406f'
                },
                highCPM: {
                    popunder: '5aaba7859189c74547218590262636ef',
                    socialbar: 'a1471a6204e5a288a2109076b3952161'
                }
            },
            
            'pucci2.html': {
                lowCPM: {
                    popunder: 'a06afd1b91c7859c505a158626b21ab5',
                    socialbar: 'e644c95728921f21f50be95a8e83406f'
                },
                highCPM: {
                    popunder: '5aaba7859189c74547218590262636ef',
                    socialbar: 'a1471a6204e5a288a2109076b3952161'
                }
            },
            
            'qezbul1.html': {
                lowCPM: {
                    popunder: '5be3c802690304ae4cc89040ad2ca066',
                    socialbar: '01354df7fb75c47a65a288d747225f1a'
                },
                highCPM: {
                    popunder: 'eecbb51015c12fbfcd22b0006e446933',
                    socialbar: '1a848bcee8d4bae2bf2bd81b1d7c5873'
                }
            },

            'pucci4.html': {
                lowCPM: {
                    popunder: '5be3c802690304ae4cc89040ad2ca066',
                    socialbar: '01354df7fb75c47a65a288d747225f1a'
                },
                highCPM: {
                    popunder: 'eecbb51015c12fbfcd22b0006e446933',
                    socialbar: '1a848bcee8d4bae2bf2bd81b1d7c5873'
                }
            },

            'kiki1.html': {
                lowCPM: {
                    popunder: 'a8ca693f5012e520d2a420a7cbe98c99',
                    socialbar: 'b03526d32d904a850f5b42807a87b09f'
                },
                highCPM: {
                    popunder: 'a8ca693f5012e520d2a420a7cbe98c99',
                    socialbar: 'b03526d32d904a850f5b42807a87b09f'
                }
            }
        };
    }

    // Détection du pays
    async detectCountry() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return data.country_code;
        } catch (error) {
            console.log('Erreur géoloc, pays par défaut: FR');
            return 'FR'; // Par défaut HIGH CPM
        }
    }

    // Charger les pubs selon la page et le pays
    async loadSmartAds() {
        const country = await this.detectCountry();
        const currentPage = this.getCurrentPage();
        
        console.log(`📄 Page: ${currentPage}, 🌍 Pays: ${country}`);
        
        if (this.lowCPMCountries.includes(country)) {
            console.log('💰 CPM FAIBLE - Chargement des pubs Low CPM');
            this.loadAdsForPage(currentPage, 'lowCPM');
        } else {
            console.log('💎 CPM ÉLEVÉ - Chargement des pubs High CPM');
            this.loadAdsForPage(currentPage, 'highCPM');
        }
    }

    // Obtenir le nom de la page actuelle
    getCurrentPage() {
        const path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    }

    // Charger les pubs spécifiques à une page
    loadAdsForPage(pageName, tier) {
        const pageConfig = this.adsConfig[pageName];
        
        if (!pageConfig) {
            console.log(`❌ Configuration manquante pour: ${pageName}`);
            return;
        }

        const ads = pageConfig[tier];
        console.log(`🎯 Chargement pubs ${tier} pour ${pageName}:`, ads);
        
        // Charger PopUnder
        if (ads.popunder) {
            this.loadAdsterraScript(ads.popunder, 'popunder');
        }
        
        // Charger Social Bar
        if (ads.socialbar) {
            this.loadAdsterraScript(ads.socialbar, 'socialbar');
        }
        
        // Marquer pour le debug
        document.body.setAttribute('data-ad-tier', tier);
        document.body.setAttribute('data-ad-page', pageName);
    }

    // Fonction générique pour charger un script Adsterra
    loadAdsterraScript(adKey, type) {
        console.log(`🔄 Injection ${type} avec clé: ${adKey}`);
        
        try {
            // Créer le script avec la configuration Adsterra
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = `
                var atOptions = {
                    'key' : '${adKey}',
                    'format' : 'iframe',
                    'height' : ${type === 'socialbar' ? 50 : 1},
                    'width' : ${type === 'socialbar' ? 320 : 1},
                    'params' : {}
                };
            `;
            document.head.appendChild(script);
            
            // Créer le script de chargement
            const loadScript = document.createElement('script');
            loadScript.type = 'text/javascript';
            loadScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
            document.head.appendChild(loadScript);
            
            console.log(`✅ ${type} injecté avec succès: ${adKey}`);
            
        } catch (error) {
            console.error(`❌ Erreur injection ${type}:`, error);
        }
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation AdsManager...');
    const adsManager = new AdsManager();
    adsManager.loadSmartAds();
});