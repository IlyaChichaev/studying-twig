<?php

ini_set( 'display_errors', 1 );
ini_set( 'error_reporting', - 1 );
ini_set( 'display_startup_errors', 1 );

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

include '../vendor/autoload.php';
include "../Database.php";

$loader = new FilesystemLoader( 'templates' );
$twig   = new Environment( $loader );

$array = [
    'arr' => [
        'key1' => [ 'value1', 'value2', 'value3', 'value4' ],
        'key2' => [ 1, 'value1', 2 ],
        'key3' => 'Just string',
    ],
];

echo $twig->render( 'base.twig', $array );