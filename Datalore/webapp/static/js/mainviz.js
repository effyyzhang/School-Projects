d3.json('static/hive.json', function(error,data){


        var linfo = {
            'MIT Amendment':"A product of the 2009 Faculty Open Access Policy. This indicates that an amendment has been submitted to the publisher along with the article declaring that, “MIT may make the Article available, and may exercise any and all rights under copyright relating thereto, in any medium, provided that the Article is not sold for a profit, and may authorize others to do the same.” Like the Open Access Policy, it also indicates that a copy of the article has been made available to DSpace@MIT at no charge.", 
            'Model Agreement': "Creative Commons Attribution-Noncommercial-Share Alike license.",            
            'Open Access Policy': "Indicates the faculty member has made an electronic copy of the final version of his or her article available to DSpace@MIT at no charge. Unlike with the MIT Amendment, it is unclear whether or not an official amendment was submitted to a publisher. This could also be used for un-published work.",
            'Publisher Creative Commons': "Deferment has been made to a publisher established Creative Commons Agreement.", 
            'Publisher Policy': "The publisher’s copyright statement may indicate that the article’s copyright was transferred by the author(s) to the publisher, or that the author used a template provided by the publisher in expectation of copyright being transferred.",
            'Springer Faculty': "Any article or book chapter written by a MIT faculty member and published in a Springer journal or book in the period of 2009 through 2015 may be archived and/or deposited in any repository, or used for any scholarly or educational purposes. These papers represent final submitted manuscripts; including peer review changes, but not copy-editing or formatting by Springer.",
            'Springer Other': "Any article or book chapter written by a non-faculty MIT author and published in a Springer journal or book in the period of 2009 through 2015 may be archived and/or deposited in any repository, or used for any scholarly or educational purposes. These papers represent final submitted manuscripts; including peer review changes, but not copy-editing or formatting by Springer.", 
            'Wiley Amendment': "Indicates that authors are required to opt out."
        }

        var lname = {
            'MIT_AMENDMENT':'MIT Amendment',
            'MODEL_AGREEMENT':'Model Agreement',
            'OPEN_ACCESS_POLICY':'Open Access Policy',
            'PUBLISHER_CC':'Publisher Creative Commons',
            'PUBLISHER_POLICY':'Publisher Policy',
            'SPRINGER_FACULTY':'Springer Faculty',
            'SPRINGER_OTHER':'Springer Other',
            'WILEY_AMENDMENT':'Wiley Amendment'
        }


        
    var nodes=data['nodes'];
	var links=data['links'];

    for(i in nodes) {

        var n = nodes[i].name;

        if(n in lname) {
            nodes[i].name = lname[n];
        }

        
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


    var width = 720,
    height = 720,
    innerRadius = 200,
    outerRadius = 350;

    var axis_colors = ["rgb(118, 249, 239)","rgb(135, 56, 233)","rgb(9, 201, 255)"];
    var exc = "rgba(255,255,255,0.3)";
    
	var angle = d3.scale.ordinal().domain(d3.range(4)).rangePoints([0, 2 * Math.PI]),
	    radius = d3.scale.linear().range([innerRadius, outerRadius]),
	    color = d3.scale.category10().domain(d3.range(20));

	var svg = d3.select("#chart_1").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(.1)rotate(0)");
    
    svg.transition().duration(1000)
        .attrTween("transform", rotTween);

    function rotTween() {
        var i = d3.interpolate(0, 360);
        return function(t) {
            return "translate(" + width / 2 + "," + height / 2 + ")scale(" + (i(t) / 360.0) + ")rotate(" + i(t) + ")";
        };
    }


    /**
     *
     *  LABELS
     *
     */

    var polL = svg.append("text").attr("dx",-120).attr("dy",-345).style("fill","#fff").attr("font-size",18).text("LICENSE");
    var yearL = svg.append("text").attr("dx",290).attr("dy",220).style("fill","#fff").attr("font-size",18).text("YEAR");
    var deptL = svg.append("text").attr("dx",-360).attr("dy",220).style("fill","#fff").attr("font-size",18).text("DEPARTMENT");

    var iris_rad = innerRadius-100;
    var svg2 = svg.append("g");
    
    svg2.append("circle")
        .attr("r",iris_rad)
        .style("fill", "#fff")
        .style("stroke", "none")
        .style("fill-opacity", "0.1");

    svg2.append("circle").attr("fill",exc).attr("id","pupil").attr("r",0);
    svg2.append("text").attr("dy",20).attr("fill","#fff").attr("text-anchor","middle").attr("id","acount").text("0").style("opacity",0).style("font-size",60);
    
    var infotext = svg2.append("text")
        .attr("text-anchor","middle");
        
    var selcur = null;
    var seld = null;
    
	svg.selectAll(".axis")
	    .data(d3.range(3))
	  .enter().append("line")
	    .attr("class", "axis")
	    .attr("transform", function(d) { return "rotate(" + degrees(angle(d)) + ")"; })
	    .attr("x1", radius.range()[0])
	    .attr("x2", radius.range()[1]);

	var inscaleL = d3.scale.linear().domain(d3.extent(links,function(d) {return d.count;})).range([0,1])
	var outscaleL = d3.scale.linear().domain([0,1]).range([3,30]);

    // d3.select("#chart_1_info").style("width",200).style("background","#ccc")
    //     .style("color","black").style("padding",7)
    //     .style("opacity",0).style("position","absolute");
    
	svg.selectAll(".link")
	    .data(links)
	  .enter().append("path")
	    .attr("class", "link")
	    .attr("d", d3.hive.link()
	    .angle(function(d) { return angle(d.x); })
	    .radius(function(d) { return radius(d.y); }))
	    // .style("stroke", function(d) { return color("#fff"); })/--effy--/
        .style("stroke", "#fff")
	    // .style("stroke-width", function(d) { return outscaleL(Math.pow(inscaleL(d.count),2))});/--effy--/
        .style("stroke-width","0.5");

	var inscale = d3.scale.linear().domain(d3.extent(nodes,function(d) {return d.sz;})).range([0,1])
	var outscale = d3.scale.linear().domain([0,1]).range([6,24]);
    var outscaleD = d3.scale.linear().domain([0,1]).range([6,20]);
    
	svg.selectAll(".node")
	    .data(nodes)
	  .enter().append("circle")
	    .attr("class", "node")
        .attr('fill-opacity','0.8')
	    .attr("transform", function(d) { return "rotate(" + degrees(angle(d.x)) + ")"; })
	    .attr("cx", function(d) { return radius(d.y); })
	    .attr("r", function(d){
	    	var factor = .5;

            var os = outscale;
	    	if(d.x == 0){
		    	factor = .3;
	    	}else if(d.x == 1){
	    		factor = .5;
	    	}else if(d.x == 2){
		    	factor = .9;
                os = outscaleD;
	    	};            

	    	return os(Math.pow(inscale(d.sz),factor));

	    })
        .on("mouseover",function(d) {

                if(d.x == 0) {
                    console.log(d3.select("#chart_1_info"));
                    d3.select("#chart_1_info").text(d.name + " - " + linfo[d.name]).transition().duration(300).style("opacity",1.0);

                }
                
                
                d3.select(this).style("stroke","#fff").transition().duration(300).style("stroke-width","2").style('fill-opacity','1');

                if(selcur != null) {

                    var count = 0;
                    
                    var curX = seld.x;
                    var curY = seld.y;

                    if(curX == d.x)
                        return;
                    
                    //is there a link here?

                    links.forEach(function(l) {
                            if(l.source.x == curX && l.source.y == curY &&
                               l.target.x == d.x && l.target.y == d.y) {
                                count = l.count;
                             
                            }
                            if(l.source.x == d.x && l.source.y == d.y &&
                               l.target.x == curX && l.target.y == curY) {
                                count = l.count;
                             
                            }
                        });

                    set_extra_info(d,count);
                    

                } else {
                    set_main_info(d);
                }
            })
        .on("mouseout",function(d) {

                d3.select("#chart_1_info").transition().duration(300).style("opacity",0.0)
                
                d3.select(this).transition().duration(300).style("stroke-width","0").style('fill-opacity','0.8');

                if(selcur == null) {
                    remove_info();
                } else {
                    remove_extra();
                }
            })
        .on("click",function(d) {

                if(selcur != null) {
                    
                
                    set_main_info(d);
                    
                    if(seld == d) {
                        svg.selectAll(".link").transition().duration(300)
                            .style("opacity","1.0").style("stroke",color("rgba(255,255,255,0.01)"));
                        selcur = null;
                        return;
                    }
                } 
                selcur = d3.select(this);
                seld = d;
                selcur.style('fill-opacity','1');

                var curX = d.x;
                var curY = d.y;

                svg.selectAll(".link").transition().duration(300)
                    .style("opacity", function(d) {
                            if ((d.source.x == curX && d.source.y == curY) ||
                                (d.target.x == curX && d.target.y == curY))
                                return 1.0;
                            else
                                return .2;
                        })
                    .style("stroke", function(d) {
                            if ((d.source.x == curX && d.source.y == curY) ||
                                (d.target.x == curX && d.target.y == curY))
                                return "#fff";
                            else
                                return "#ccc";
                        })
                    

            })
	    .style("fill", function(d) {
                return axis_colors[d.x];});

	function degrees(radians) {
	  return radians / Math.PI * 180 - 90;
	};

    function set_main_info(d) {

        infotext.remove();
        
        infotext = svg2.append("text")
            .attr("text-anchor","middle");

        var label = infotext.append("tspan").attr("id","sellabel").attr("x",0).attr("dy",-120).style("fill","#fff").style("font-size",18).text(d.name);

        var cur = parseInt(d3.select("#acount").text());

        d3.select("#acount").transition()
            .duration(300).style("opacity",1.0)
            .tween("text", function() {
                var i = d3.interpolate(cur,d.sz);
                return function(t) {
                    this.textContent = Math.round(i(t));
                };
            });
        d3.select("#pupil").transition().duration(200).attr("r",0);

    }

    function set_extra_info(d,count) {
        
        infotext.append("tspan").attr("x",0).attr("dy",260).style("fill","#fff").text(d.name).style("font-size",18).style("font-weight",300).attr("class","extratext");

        console.log(seld.sz-count);
        console.log(seld);

        var irisscale = d3.scale.linear().domain([0,seld.sz]).range([0,iris_rad]);
        
        d3.select("#pupil").transition().duration(200).attr("r",irisscale(count)).text(d.name);

        var cur = parseInt(d3.select("#acount").text());

        d3.select("#acount").transition()
            .duration(300)
            .tween("text", function() {
                var i = d3.interpolate(cur,count);
                return function(t) {
                    this.textContent = Math.round(i(t));
                };
            });


    }

    function remove_extra() {
        d3.select("#pupil").transition().duration(200).attr("r",0);


        set_main_info(seld);
    }

    function remove_info() {
        infotext.selectAll("tspan").remove();
        d3.select("#acount").transition().duration(300).style("opacity",0.0);
    }
    
	});
