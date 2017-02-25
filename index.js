#!/usr/bin/env node
var fse = require('fs-extra');
var rr = require('recursive-readdir');
rr(process.cwd()+'/img', function(err, images){
	for (var i = images.length - 1; i >= 0; i--) {
		images[i] = images[i].replace(process.cwd()+'/img', '');
		images[i] = images[i].replace(process.cwd()+'\\img', '');
	}
	for (var i = images.length - 1; i >= 0; i--) {
		if (images[i].match(/.(jpg|jpeg|png|gif|gif)$/i))
			continue;
		images.splice(i,1);
	}
	console.log();
	rr(process.cwd(), function(err, files){
		for (var i = files.length - 1; i >= 0; i--) {
			if (files[i].match(/.(html|css|js)$/i))
				continue;
			files.splice(i,1);
		}
		var filesData = [];
		for (var i = 0; i < files.length; i++) {
			filesData.push(fse.readFileSync(files[i], 'utf8'));
		}
		for (var i = 0; i < images.length; i++) {
			var shouldBeDeleted = true;
			for (var j = 0; j < filesData.length; j++) {
				if(filesData[j].indexOf(images[i])>-1){
					shouldBeDeleted = false;
					break;
				}
			}
			if(shouldBeDeleted){
				console.log('deleting: '+process.cwd()+'/img'+images[i]);
				fse.removeSync(process.cwd()+'/img'+images[i]);
			}			
		}
		process.exit(0);
	});
});