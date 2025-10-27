<?php
// proxy.php - Proxy avancé pour contourner les pubs
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$target_url = $_GET['url'] ?? '';
$provider = $_GET['provider'] ?? 'dood';

if (empty($target_url)) {
    die('URL manquante');
}

// Nettoyer et valider l'URL
$target_url = filter_var(urldecode($target_url), FILTER_SANITIZE_URL);

if (!filter_var($target_url, FILTER_VALIDATE_URL)) {
    die('URL invalide');
}

// Configuration par fournisseur
$user_agents = [
    'dood' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'streamtape' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
];

$referers = [
    'dood' => 'https://doodstream.com/',
    'streamtape' => 'https://streamtape.com/'
];

$ch = curl_init();

// Configuration CURL avancée
curl_setopt_array($ch, [
    CURLOPT_URL => $target_url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_USERAGENT => $user_agents[$provider] ?? $user_agents['dood'],
    CURLOPT_REFERER => $referers[$provider] ?? $referers['dood'],
    CURLOPT_HTTPHEADER => [
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language: fr-FR,fr;q=0.9,en;q=0.8',
        'Cache-Control: no-cache',
        'Connection: keep-alive',
        'Upgrade-Insecure-Requests: 1',
    ],
]);

$content = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code !== 200 || !$content) {
    http_response_code(404);
    die('Contenu non disponible');
}

// Filtrer le contenu pour supprimer les pubs
$content = removeAds($content);

// Renvoyer le contenu nettoyé
header('Content-Type: text/html; charset=utf-8');
echo $content;

function removeAds($html) {
    // Supprimer les scripts publicitaires

    // Supprimer les iframes publicitaires
    $html = preg_replace('/<iframe[^>]*\b(ad|ads|advertisement|banner)[^>]*>.*?<\/iframe>/is', '', $html);
    
    // Supprimer les divs publicitaires
    $html = preg_replace('/<div[^>]*\b(ad|ads|advertisement|banner)[^>]*>.*?<\/div>/is', '', $html);
    
    // Supprimer les liens publicitaires
    $html = preg_replace('/<a[^>]*\b(ad|ads|advertisement|banner)[^>]*>.*?<\/a>/is', '', $html);
    
    // Supprimer les meta publicitaires
    $html = preg_replace('/<meta[^>]*\b(ad|ads)[^>]*>/i', '', $html);
    
    return $html;
}
?>