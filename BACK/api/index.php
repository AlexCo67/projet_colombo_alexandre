<?php
use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tuupola\Middleware\JwtAuthentication as JwtAuthentication;
use Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

require  __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';


const JWT_SECRET = "leprojetweb";

$app = AppFactory::create();

$app->options('/{routes:.+}', function (ServerRequestInterface $request, ResponseInterface $response): ResponseInterface {
  return $response;
});

function addHeaders($response) {
  $response = $response->withHeader("Content-Type", "application/json")
  ->withHeader('Access-Control-Allow-Origin', '*')
  ->withHeader("Access-Control-Allow-Headers", 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
  ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
  ->withHeader("Access-Control-Expose-Headers", "Authorization", '*')
  ->withHeader('Access-Control-Allow-Credentials', 'true');
  
    return $response;
}





function createClient($nom, $prenom, $ville, $codePostal, $email, $tel, $civilite, $login, $password)
{
    global $entityManager;
    $client = new Client;

    $client->setNom($nom);
    $client->setPrenom($prenom);
    $client->setVille($ville);
    $client->setCodepostal($codePostal);
    $client->setEmail($email);
    $client->setTelephone($tel);
    $client->setCivilite($civilite);
    $client->setLogin($login);
    $client->setPassword($password);

    $entityManager->persist($client);
    $entityManager->flush();
}

function authClient($login, $password){
  global $entityManager;
  $cr = $entityManager->getRepository('Client');
  $client = $cr->findOneByLogin($login);
  if(is_null(($cr))){
    return array("status" => "error", "message"=>"no repository found error");
  }
  if(is_null($client)){
      return array("status" => "error", "message"=>"no client found error");
  }
  if($client->getPassword()!=$password){
    return array("status" => "error", "message"=>"password error");
}
return array("status"=>"ok", "message"=>$client);

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
    "ignore" => ["/api/login", "/api/hello", "/api/form", "/api/update", "/api/update2"],
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



$app->post('/api/form', function (Request $request, Response $response, $args)
{
    $body = $request->getParsedBody();
    $login = $body['login'];
    $password = $body['password'];
    $nom = $body['lastName'];
    $prenom = $body['name'];
    $ville = $body['town'];
    $codePostal = $body['postalCode'];
    $email = $body['email'];
    $tel = $body['phone'];
    $civilite = $body['civil'];

    if(is_null($login) || $login == "" || is_null($password) || $password == "" || is_null($nom) || $nom == "" || is_null($prenom) || $prenom == "" || is_null($ville) || $ville == "" || is_null($codePostal) || $codePostal == "" || is_null($email) || $email == "" || is_null($tel) || $tel == "" || is_null($civilite) || $civilite == "")
    {
        $response = $response->withStatus(400);
        $response = $response->withHeader("Content-Type", "application/json");
        $response->getBody()->write(json_encode(array("message" => "Il y a des données manquantes"." login:".$login." password:".$password." nom:".$nom." prenom:".$prenom." ville:".$ville." codePostal:".$codePostal." email:".$email." tel:".$tel." civilite:".$civilite)));
        return $response;
    }

    CreateClient($nom, $prenom, $ville, $codePostal, $email, $tel, $civilite, $login, $password);

    return $response;
});





$app->get('/api/auth/{login}', function (Request $request, Response $response, $args) {
  $login = $args['login'];
  if ($login) 
  {
      
    global $entityManager;
    $cr = $entityManager->getRepository('Client');
    $client = $cr->findOneByLogin($login);


      $data["login"] = $login;
      $data["password"] = $client->getPassword();
      $data["lastName"] = $client->getNom();
      $data["name"] = $client->getPrenom();
      $data["town"] = $client->getVille();
      $data["phone"] = $client->getTelephone();
      $data["postalCode"] = $client->getCodepostal();
      $data["email"] = $client->getEmail();
      $data["civil"] = $client->getCivilite();
      $response = addHeaders($response);
      $response = createJWT($response, $login);
      
      $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
  }
  else {
    $data = array('ERREUR' => 'CAFOUILLAGE DANS LE GET');
    $response->getBody()->write(json_encode($data));
      $response = $response->withStatus(401);
  }
  return $response;
});



$app->post('/api/update', function (Request $request, Response $response, $args) {

try{
  $data = $request->getParsedBody();
    if(is_null($data)){
      $data = array('VIDE' => $data);
      $response = addHeaders($response);
      $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
  
      return $response;

    }

  
 //   $login = $body['login'];
  //  $password = $body['password'];
  //  $nom = $body['lastName'];
  //  $prenom = $body['name'];
  //  $ville = $body['town'];
  //  $codePostal = $body['postalCode'];
  //  $email = $body['email'];
  //  $tel = $body['phone'];
  //  $civilite = $body['civil'];

  global $entityManager;

    $cr = $entityManager->getRepository('Client');
    $client = $cr->findOneByLogin("test");

    $client->setNom($data['lastName']);
    $client->setPrenom($data['name']);
    $client->setVille($data['town']);
    $client->setTelephone($data['phone']);
    $client->setEmail($data['email']);
    $client->setPassword($data['password']);
    $client->setCivilite($data['civil']);
    $client->setCodepostal($data['postalCode']);
    $entityManager->flush();

    $data = array('on teste' => $data['lastName']);
    $response = addHeaders($response);
    $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

    return $response;
}
catch (Exception $e){
  $data = array('on teste' => 'detection erreur ');
  $response = addHeaders($response);
    $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

    return $response;
}

});



$app->post('/api/login', function (Request $request, Response $response, $args) {
  $body = $request->getParsedBody();
  $login = $body['login'];
  $mdp = $body['password'];

  $result=authClient($login, $mdp);


  if(is_null($login)||$login==""||(is_null($mdp)||$mdp=="")){
      $data = array('ERREUR' => 'login or mdp empty');
      $response=$response->withHeader("Content-Type", "application/json");
      $response->getBody()->write(json_encode($data));
      $response=$response->withStatus(400);
      return $response;
  }

  if($result['status']=='error'){
   $data = array('ERREUR' => 'MAUVAIS LOG', 'message' => $result['message']);
   $response->getBody()->write(json_encode($data));
     $response = $response->withStatus(401);
    return $response;    
  }
else{
      $client=$result["message"];
//        $data=array('Login'=>$client->getLogin() );    
      $data["login"] = $client->getLogin();
      $data["password"] = $client->getPassword();
      $data["nom"] = $client->getNom();
      $data["prenom"] = $client->getPrenom();
      $data["ville"] = $client->getVille();
      $data["tel"] = $client->getTelephone();
      $data["codePostal"] = $client->getCodepostal();
      $data["email"] = $client->getEmail();
      $data["civilite"] = $client->getCivilite();
      $response = addHeaders($response);
      $response = createJWT($response, $login);
      $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
  return $response;
}
});








$app->post('/api/update2', function (Request $request, Response $response, $args) {

  
    $data = array('on teste' => 'OK ');
    $response = addHeaders($response);
      $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
      return $response;
  });













// Run app
$app->run();


?>