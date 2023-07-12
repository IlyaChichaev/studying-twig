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

    let head_row  = document.querySelectorAll ( "TH" ) ,
        cell_sort = head_row [ column_sort ];

    function change_arrow ( data_sort ) {

        function changeArrowInOtherCells () {
            for ( let i = 0; i < head_row.length; i++ ) {
                if ( i === column_sort ) {
                    continue;
                }
                head_row[ i ].innerHTML = head_row[ i ].innerHTML.replace ( "do" , "no" );
                head_row[ i ].innerHTML = head_row[ i ].innerHTML.replace ( "up" , "no" );
                head_row[ i ].setAttribute ( "data-sort" , "1" );
            }
        }


        switch ( data_sort ) {
            case "-1":
                cell_sort.innerHTML = cell_sort.innerHTML.replace ( "do" , "up" );
                cell_sort.innerHTML = cell_sort.innerHTML.replace ( "no" , "do" );
                changeArrowInOtherCells ();
                break;
            case "1":
                cell_sort.innerHTML = cell_sort.innerHTML.replace ( "up" , "do" );
                cell_sort.innerHTML = cell_sort.innerHTML.replace ( "no" , "do" );
                changeArrowInOtherCells ();
                break;
            default:
                cell_sort.setAttribute ( "data-sort" , "1" );
                changeArrowInOtherCells ();
                break;
        }
        // if ( cell_sort.innerHTML.includes ( "up" ) ) {
        //     cell_sort.innerHTML = cell_sort.innerHTML.replace ( "up" , "do" );
        //     changeArrowInOtherCells ()
        // }
        // else if ( cell_sort.innerHTML.includes ( "do" ) ) {
        //     cell_sort.innerHTML = cell_sort.innerHTML.replace ( "do" , "up" );
        //     changeArrowInOtherCells ()
        // }
        // else if ( cell_sort.innerHTML.includes ( "no" ) ) {
        //     cell_sort.innerHTML = cell_sort.innerHTML.replace ( "no" , "up" );
        //     changeArrowInOtherCells ()
        // }

    }

    if ( cell_sort.hasAttribute ( "data-sort" ) ) {
        let data_sort = cell_sort.getAttribute ( "data-sort" );
        if ( data_sort === "1" ) {
            cell_sort.setAttribute ( "data-sort" , "-1" );
        }
        else if ( data_sort === "-1" ) {
            cell_sort.setAttribute ( "data-sort" , "1" );
        }

        change_arrow ( data_sort );
    }
}