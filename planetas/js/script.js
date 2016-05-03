window.onload = function()
{
	var tamJupiter = 300;
	var tamPlanetas = 	{
						Marte: 6794, 
						Tierra: 12756,
						Venus: 12104,
						Mercurio: 4880,
						Jupiter: 142984
					  	};

		dataPlanetas  = 	[{tam: (tamPlanetas.Mercurio / tamPlanetas.Jupiter) * tamJupiter, img:"img/mercurio.jpg"},
							{tam: (tamPlanetas.Venus / tamPlanetas.Jupiter) * tamJupiter,img:"img/venus.jpg"},
							{tam: (tamPlanetas.Tierra / tamPlanetas.Jupiter) * tamJupiter, img: "img/tierra.jpg"},
							{tam: (tamPlanetas.Marte / tamPlanetas.Jupiter) * tamJupiter, img: "img/marte.jpg"},
							{tam: tamJupiter,img:"img/jupiter.jpg"}];
						


	var arrayPlanetas = [];
	var ancho = window.innerWidth;
	var alto = window.innerHeight;
	var lienzo = new THREE.WebGLRenderer({alpha: true});
	lienzo.setSize(ancho, alto);
	document.body.appendChild(lienzo.domElement);
	var escena 		  = new THREE.Scene,
		tamanoJupiter = 300;
	var crearPlaneta = function(data)
	{
		var geometria = new THREE.SphereGeometry(data.tamano,data.tamano,data.tamano);
		var textura = THREE.ImageUtils.loadTexture(data.imagen);
		var material = new THREE.MeshBasicMaterial( { map: textura } );

		return new THREE.Mesh(geometria, material);
	};
	
	for (var i = 0; i < dataPlanetas.length; i++) {
		console.log(dataPlanetas[i].img);
		var planetas = crearPlaneta({
									tamano 	: dataPlanetas[i].tam,
									imagen	: dataPlanetas[i].img
							  });
		arrayPlanetas.push(planetas);
		escena.add(planetas);
	};
/*
	var jupiter = crearPlaneta({
									tamano 	: tamanoJupiter,
									imagen	: 'img/jupiter.jpg'
			
						  });
	escalaJupiter = true;
	escena.add(jupiter);
	*/
	
	var camara = new THREE.PerspectiveCamera(50,(ancho / alto),0.1, 10000);
	camara.position.y = 160;
	camara.position.z = 400;
	camara.lookAt(arrayPlanetas[arrayPlanetas.length-1].position);
	arrayPlanetas[0].position.x = -400;
	arrayPlanetas[1].position.x = -250;
	arrayPlanetas[2].position.x = -100;
	arrayPlanetas[3].position.x = 50;
	arrayPlanetas[4].position.x = 500;
	escena.add(camara);
	function renderizar()
	{
		//jupiter.rotation.y += 0.001;
		for (var i = 0; i < arrayPlanetas.length; i++) {
			arrayPlanetas[i].rotation.y += 0.01;
			arrayPlanetas[i].rotation.x += 0.02;
			arrayPlanetas[i].position.z -= 2;

		};

		
		

		lienzo.render(escena, camara);
		requestAnimationFrame(renderizar);
	}
	renderizar();
};
