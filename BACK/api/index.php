<?php
use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tuupola\Middleware\JwtAuthentication as JwtAuthentication;
use Firebase\JWT\JWT;

require  __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';


const JWT_SECRET = "leprojetweb";

$app = AppFactory::create();

function addHeaders($response) {
    $response = $response->withHeader("Content-Type", "application/json")
      ->withHeader("Access-Control-Allow-Origin", "https://projet-colombo-alexandre-back.herokuapp.com/")
      ->withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
      ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
      ->withHeader("Access-Control-Expose-Headers", "Authorization");
  
    return $response;
}

function createJWT($response, $login) {
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
      'login' => $login,
      'iat' => $issuedAt,
      'exp' => $expirationTime
    );
  
    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}


// Config authenticator Tuupola
$app->add(new JwtAuthentication([
    "secret" => JWT_SECRET,
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "path" => ["/api"],
    "ignore" => ["/api/login", "/api/hello", "/api/wehsalors"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
]));

$app->get('/api/hello/{name}',
function (Request $request, Response $response,$args) {
$data = array('MESSAGE' => 'BONJOUR');
$response->getBody()->write(json_encode($data));
return $response;});
// Run app
$app->run();

?>