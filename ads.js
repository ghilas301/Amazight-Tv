// ads-manager.js - À placer dans le dossier principal
class AdsManager {
    constructor() {
        this.lowCPMCountries = ['DZ', 'MA', 'TN', 'LY', 'EG', 'NG', 'SN', 'CI', 'KE', 'ZA', 'GH', 'UG', 'ET'];
        this.highCPMCountries = ['FR', 'DE', 'US', 'CA', 'GB', 'IT', 'ES', 'NL', 'BE', 'CH', 'SE', 'NO', 'AU'];
        
        // CONFIGURATION DES CODES PUB PAR PAGE
        this.adsConfig = {
            // PAGE D'ACCUEIL
            'index.html': {
                lowCPM: {
            
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/31/c4/9c/31c49ce66a7cc87dbcb332ef3d028acb.js'></script>`
                },
                highCPM: {
                   
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/1a/84/8b/1a848bcee8d4bae2bf2bd81b1d7c5873.js'></script>`
                }
            },
            
            // PAGE CATALOGUE
             'films.html': {
                lowCPM: {
            
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/31/c4/9c/31c49ce66a7cc87dbcb332ef3d028acb.js'></script>`
                },
                highCPM: {
                   
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/1a/84/8b/1a848bcee8d4bae2bf2bd81b1d7c5873.js'></script>`
                }
            },
            
            // PAGES FILMS
            'crek1.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/33/f1/e7/33f1e7c6d75e2f682e23c1b808298345.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/e7/b1/81/e7b181338eaa06b685207f96248c8503.js'></script>`
                },
                highCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/31/e3/50/31e35007374249b8ff4b29d59023c901.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/64/a4/3d/64a43db18adc60ad084e70f6cf2320b0.js'></script>`
                }
            },
            
                     'qiq1.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/33/f1/e7/33f1e7c6d75e2f682e23c1b808298345.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/e7/b1/81/e7b181338eaa06b685207f96248c8503.js'></script>`
                },
                highCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/31/e3/50/31e35007374249b8ff4b29d59023c901.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/64/a4/3d/64a43db18adc60ad084e70f6cf2320b0.js'></script>`
                }
            },

            'limucucu1.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/d5/75/c8/d575c843848496f1953b8976c8fb3699.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/a1/a2/f3/a1a2f3e477b00d7ba5af25a4d1a70d86.js'></script>`
                },
                highCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/2f/d9/8a/2fd98a043f3b6e5e13801758f641d1ed.js'></script>`, 
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/f7/44/6a/f7446a9645e376ef3a15c6fdafc9adc3.js'></script>`
                }
            },
            
              'limucucu2.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/d5/75/c8/d575c843848496f1953b8976c8fb3699.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/a1/a2/f3/a1a2f3e477b00d7ba5af25a4d1a70d86.js'></script>`
                },
                highCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/2f/d9/8a/2fd98a043f3b6e5e13801758f641d1ed.js'></script>`, 
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/f7/44/6a/f7446a9645e376ef3a15c6fdafc9adc3.js'></script>`
                }
            },

                'narnia1.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/c3/68/d4/c368d4070317dd34c662d9be76de6991.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/e1/4c/f2/e14cf2faff0ae082f33320f37b42bc48.js'></script>`
                },
                highCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/e6/74/11/e6741100cf4581e3832806de7f4d3142.js'></script>`, 
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/d2/7f/78/d27f787ad701664d297cc3b8663127f3.js'></script>`
                }
            },
            
            'narnia2.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/c3/68/d4/c368d4070317dd34c662d9be76de6991.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/e1/4c/f2/e14cf2faff0ae082f33320f37b42bc48.js'></script>`
                },
                highCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/e6/74/11/e6741100cf4581e3832806de7f4d3142.js'></script>`, 
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/d2/7f/78/d27f787ad701664d297cc3b8663127f3.js'></script>`
                }
            },
            
            'pucci1.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/a0/6a/fd/a06afd1b91c7859c505a158626b21ab5.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/e6/44/c9/e644c95728921f21f50be95a8e83406f.js'></script>`
                },
                highCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/5a/ab/a7/5aaba7859189c74547218590262636ef.js'></script>`, 
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/a1/47/1a/a1471a6204e5a288a2109076b3952161.js'></script>`
                }
            },
            
            'pucci2.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/a0/6a/fd/a06afd1b91c7859c505a158626b21ab5.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/e6/44/c9/e644c95728921f21f50be95a8e83406f.js'></script>`
                },
                highCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/5a/ab/a7/5aaba7859189c74547218590262636ef.js'></script>`, 
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/a1/47/1a/a1471a6204e5a288a2109076b3952161.js'></script>`
                }
            },
            
            'qezbul1.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/5b/e3/c8/5be3c802690304ae4cc89040ad2ca066.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/01/35/4d/01354df7fb75c47a65a288d747225f1a.js'></script>`
                },
                highCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/ee/cb/b5/eecbb51015c12fbfcd22b0006e446933.js'></script>`, 
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/1a/84/8b/1a848bcee8d4bae2bf2bd81b1d7c5873.js'></script>`
                }
            },

              'pucci4.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/5b/e3/c8/5be3c802690304ae4cc89040ad2ca066.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/01/35/4d/01354df7fb75c47a65a288d747225f1a.js'></script>`
                },
                highCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/ee/cb/b5/eecbb51015c12fbfcd22b0006e446933.js'></script>`, 
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/1a/84/8b/1a848bcee8d4bae2bf2bd81b1d7c5873.js'></script>`
                }
            },

              'kiki1.html': {
                lowCPM: {
                    popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/a8/ca/69/a8ca693f5012e520d2a420a7cbe98c99.js'></script>`,
                    socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/b0/35/26/b03526d32d904a850f5b42807a87b09f.js'></script>`
                },
                highCPM: {
                 popunder: `<script type='text/javascript' src='//foreststobaccodecember.com/a8/ca/69/a8ca693f5012e520d2a420a7cbe98c99.js'></script>`,
                 socialbar: `<script type='text/javascript' src='//foreststobaccodecember.com/b0/35/26/b03526d32d904a850f5b42807a87b09f.js'></script>`
                }
            },
            
            
            
            // AJOUTEZ TOUTES VOS AUTRES PAGES FILMS ICI...
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
        
        console.log(`Page: ${currentPage}, Pays: ${country}`);
        
        if (this.lowCPMCountries.includes(country)) {
            this.loadAdsForPage(currentPage, 'lowCPM');
        } else {
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
            console.log(`Configuration manquante pour: ${pageName}`);
            return;
        }

        const ads = pageConfig[tier];
        
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
   
loadAdsterraScript(scriptHTML, type) {
    console.log(`🔄 Tentative d'injection ${type}:`, scriptHTML);
    
    try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = scriptHTML;
        const scriptElement = tempDiv.querySelector('script');
        
        if (scriptElement && scriptElement.src) {
            const newScript = document.createElement('script');
            newScript.src = scriptElement.src;
            newScript.type = scriptElement.type || 'text/javascript';
            
            document.head.appendChild(newScript);
            console.log(`✅ ${type} injecté avec succès: ${scriptElement.src}`);
        } else {
            console.error(`❌ Script ${type} invalide: pas de source trouvée`);
        }
    } catch (error) {
        console.error(`❌ Erreur injection ${type}:`, error);
    }
}
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    const adsManager = new AdsManager();
    adsManager.loadSmartAds();
});