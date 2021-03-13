<?php
require_once 'vendor/autoload.php';
use Symfony\Component\Dotenv\Dotenv;

$dotenv = new Dotenv();
$dotenv->load(__DIR__.'/.env');

R::setup('mysql:host=127.0.0.1:3307;dbname='.$_ENV["DB_NAME"], $_ENV["DB_USER_NAME"], $_ENV["DB_USER_PASSWORD"]);