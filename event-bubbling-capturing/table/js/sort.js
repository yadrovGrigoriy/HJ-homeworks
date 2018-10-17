'use strict';

function handleTableClick(event) {
  switch( event.target.dataset.dir ){
  	case '1':
  		event.target.dataset.dir = '-1';
  		break;
  	case '-1':
  		event.target.dataset.dir = '1';
  		break;
  	default:
  		event.target.dataset.dir = '1';	
  }
  event.currentTarget.dataset.sortBy = event.target.dataset.propName;
	 sortTable( event.target.dataset.propName, event.target.dataset.dir ); 
}
