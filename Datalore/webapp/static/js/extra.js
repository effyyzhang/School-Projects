for(i in nodes) {

        var n = nodes[i].name;

        console.log(n);
        if(n == 'Department of Electrical Engineering and Computer Science') {
            nodes[i].name = "EECS";
        }
        if(n == 'Department of Mechanical Engineering') {
            nodes[i].name = "Mech Eng";
        }
        if(n == 'Harvard University--MIT Division of Health Sciences and Technology') {
            nodes[i].name = "Health Sci & Tech";
        }
        if(n == 'Computer Science and Artificial Intelligence Laboratory') {
            nodes[i].name = "CSAIL";
        }
        if(n == 'Department of Biological Engineering') {
            nodes[i].name = 'Biological Engineering';
        }
        if(n == 'Department of Brain and Cognitive Sciences') {
            nodes[i].name = 'BCS';
        }
        if(n == 'Department of Chemistry') {
            nodes[i].name = 'Chemistry';
        }
        if(n == 'Department of Biology') {
            nodes[i].name = 'Biology';
        }
        if(n == 'Department of Physics') {
            nodes[i].name = 'Physics';
        }
        if(n == 'Laboratory for Nuclear Science') {
            nodes[i].name = 'Nuclear Science';
        }

    }
