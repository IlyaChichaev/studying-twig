"use strict";

function sort_table ( column_sort ) {
    let table        = document.querySelector ( "tbody" ) ,
        rows         = table.rows ,
        table_array  = [] ,
        array_inside = [];

    for ( let row of rows ) {
        array_inside = [];
        for ( let item of row.children ) {
            array_inside.push ( item.innerHTML );
        }
        table_array.push ( array_inside );
    }

    let first_row      = table_array.shift () ,
        sort_direction = document.querySelectorAll ( "TH" )[ column_sort ].getAttribute ( "data-sort" );

    function compareRows ( row1 , row2 ) {
        let row1Element = row1[ column_sort ] ,
            row2Element = row2[ column_sort ];
        if ( !isNaN ( Number ( row1Element ) ) || !isNaN ( Number ( row2Element ) ) ) {
            return sort_direction * Number ( row1Element ) - sort_direction * Number ( row2Element );
        }
        else {
            return row1Element > row2Element ? 1 * sort_direction : -1 * sort_direction;
        }
    }

    table_array.sort ( compareRows );
    table_array.unshift ( first_row );

    let i = 0;
    for ( let row of rows ) {
        let j = 0;
        for ( let item of row.children ) {
            item.innerHTML = table_array[ i ][ j ];
            j++;
        }
        i++;
    }
    change_attribute ( column_sort );
}

function change_attribute ( column_sort ) {
    let cell_sort = document.querySelectorAll ( "TH" );
    if ( cell_sort[ column_sort ].hasAttribute ( "data-sort" ) ) {
        cell_sort[ column_sort ].getAttribute ( "data-sort" ) === "1"
        ? cell_sort[ column_sort ].setAttribute ( "data-sort" , "-1" )
        : cell_sort[ column_sort ].setAttribute ( "data-sort" , "1" );
    }
}
