/*
  Descripción: Rompecabezas con javascript, html y css, dificultad escalable por número de piezas.
  Autor: Carlos Medina
  http://www.facebook.com/xziolhvinvhgl
  https://twitter.com/unaexpresion
  Imagen tomada de: http://www.dailypainters.com/paintings/223207/-324-Red-Bellied-Bandit/Jeff-Mahorney
*/

var select = false;
var c = "inc";
var pos_s = "";
var id_s = "";

var rompecabezas = {
  _arr_pos_r : new Array(),
  _arr_pos_a : new Array(),
  
  _mostrar: function(){
  	rompecabezas._arr_pos_r.length = 0;
		var piezas = rompecabezas._get("piezas").value;
		var tb = document.createElement('table');
		tb.border = 1;
		tb.align = 'center';
		tb.cellPadding = 0;
		tb.cellSpacing = 0;
		var dp = document.createElement('div');
		dp.id = 'posiciones';
		dp.className = 'posic';
		var ar = Math.sqrt(piezas);
		var c = 0;
		var tam_img = 300;
		var pos_img = tam_img / ar;
		for(var fil=1;fil<=ar;fil++){
			var tr = document.createElement('tr');
			for(var cel=1;cel<=ar;cel++){
				c++;
				var td = document.createElement('td');
				td.className = 'pieza';
				td.id = 'pos_'+c;
				td.style.width = pos_img+'px';
				td.style.height = pos_img+'px';
				var dbp = document.createElement('div');
				dbp.id = 'val_bp_'+c;
				var p = Math.round(((pos_img*cel)-pos_img) * -1)+'px '+Math.round(((fil * pos_img)-pos_img) * -1)+'px';
				td.style.backgroundPosition = p;
				rompecabezas._arr_pos_r.push(p);
				dbp.innerHTML = p;
				dp.appendChild(dbp);
				td.onclick = function(){
					rompecabezas._cambiaBGP(this.id);
					rompecabezas._compruebaFin();
				}
				tr.appendChild(td);
			}
			tb.appendChild(tr);
		}
		if(!rompecabezas._get("div_content")){
			var cont = document.createElement('div');
			cont.id = 'div_content';
			cont.appendChild(tb);
			cont.appendChild(dp);
			document.body.appendChild(cont);
		}else{
			rompecabezas._get("div_content").innerHTML = '';
			rompecabezas._get("div_content").appendChild(tb);
			rompecabezas._get("div_content").appendChild(dp);
			rompecabezas._get("posiciones").removeClass('posic');
			rompecabezas._get("posiciones").innerHTML = '';
			rompecabezas._get("posiciones").className = 'posic';
		}
	},
	
	_barajar: function(){
		var num_alt = null;
		var arr = new Array();
		var resp = "no";
		var i = -1;
		var repite = "no";
		var pie = parseInt(rompecabezas._get("piezas").value);
		var pie1 = pie + 1;
		while(arr.length < pie){
			repite = "no";
			num_alt = Math.floor(Math.random()*pie1);
			if(num_alt != 0){
				if(arr.length == 0){
					i++;
					arr[i] = num_alt;
				}else{
					for(j=0;j<=arr.length-1;j++){
						if(arr[j] == num_alt){
							repite = "si";
						}
					}
					if(repite != "si"){
						i++;
						arr[i] = num_alt;
					}
				}
			}
		}
	
		var id = 0;	
		for(k=0; k<=arr.length-1;k++){
			id = k-(-1);
			rompecabezas._get("pos_"+id).style.backgroundPosition = rompecabezas._get("val_bp_"+arr[k]).innerHTML;
		}
	},
	
	_cambiaBGP: function(id){
		if(select == false){
			pos_s = rompecabezas._get(id).style.backgroundPosition;
			id_s = id;
			select = true;
      rompecabezas._get(id_s).style.boxShadow = '1px 1px 14px #FFF,-1px -1px 14px #FFF, 1px -1px 14px #FFF,-1px 1px 14px #FFF';
		}else{
			var pos_n =  rompecabezas._get(id).style.backgroundPosition;
			var id_n = id;
			c = "com";
			select = false;
		}
	 
		if(c == "com"){ rompecabezas._get(id_n).style.backgroundPosition = pos_s; rompecabezas._get(id_s).style.backgroundPosition = pos_n;
			c = "inc";
      rompecabezas._get(id_s).style.boxShadow = '';
		}
	},
	
	_compruebaFin: function(){
		var pie = parseInt(rompecabezas._get("piezas").value);
		var fin = false;
		rompecabezas._arr_pos_a.length = 0;
		for(var i=1;i<=pie;i++){
			rompecabezas._arr_pos_a.push(rompecabezas._get("pos_"+i).style.backgroundPosition);
		}
		for(var j=0;j<rompecabezas._arr_pos_r.length;j++){
			if(rompecabezas._arr_pos_r[j] != rompecabezas._arr_pos_a[j]){
				fin = false;
				break;
			}else{
				fin = true;
			}
		}
		
		if(fin){
			alert("LO RESOLVISTE COMPADRE!!")
		}
	},
	
	_get: function(id){
		return document.getElementById(id);
	}
};


window.onload = function(){
	rompecabezas._mostrar();
  rompecabezas._barajar();
  rompecabezas._get("piezas").onchange = function(){
    rompecabezas._mostrar();
  }
    rompecabezas._get("barajar").onclick = function(){
      rompecabezas._barajar();
    }
}