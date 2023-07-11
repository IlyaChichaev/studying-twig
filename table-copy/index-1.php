<?php

$start_timer = microtime( TRUE );

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

include '../vendor/autoload.php';
include "../database.php";

$loader = new FilesystemLoader( 'templates' );
$twig   = new Environment( $loader );

$database                    = new Database();
$database_array              = $database->get_currencies_list();
$table_array['heading_rows'] = array_keys( (array) $database_array[0] );

foreach ( $database_array as $row_array ) {
    $table_array['data_rows'][] = array_values( (array) $row_array );
}

$result_array = [ 'table_rows' => $table_array ];

echo $twig->render( 'base-1.twig', $result_array );


$end_timer = microtime( TRUE );
echo "<div class='text'>End time: " . $end_timer . "</div>";
echo "<div class='text'>Start time: " . $start_timer . "</div>";
echo "<div class='text'>" . (float) $end_timer - (float) $start_timer
     . "</div>";