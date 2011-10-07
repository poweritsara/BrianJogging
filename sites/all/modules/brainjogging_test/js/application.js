BrianJogging = {};

// Word flash
BrianJogging.wordflash = (function(pub) {
  pub.initialize = function(){
    words = [];
    words[1] = Array('Apple', 'Apricot', 'Avocado', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Currant', 'Cherry', 'Cherimoya', 'Clementine', 'Date', 'Damson', 'Durian', 'Eggplant', 'Elderberry', 'Feijoa', 'Gooseberry', 'Grape', 'Grapefruit', 'Huckleberry', 'Jackfruit', 'Jambul', 'Kiwi', 'Kumquat', 'Legume', 'Lemon', 'Lime', 'Lychee', 'Mango', 'Mangostine', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Rock', 'Nectarine', 'Orange', 'Peach', 'Pear', 'Bartlett', 'Physalis', 'Plum', 'Pineapple', 'Pomegranate', 'Raisin', 'Raspberry', 'Raspberry', 'Peaches', 'Rambutan', 'Redcurrant', 'Salal', 'jujube', 'Carrot','Figs', 'Dates', 'Olive', 'Jujube', 'Pomegranate', 'Lemon', 'Lime', 'KeyLime', 'Mandarin', 'Orange', 'Tangerine', 'Avocado', 'Guava', 'Kumquat', 'Lychee', 'Passion', 'Tomato', 'CashewFruit', 'Cacao', 'Coconut', 'Custard', 'Jackfruit', 'Mango', 'Okra', 'Pineapple');
    words[2] = Array('Carefully', 'Easily', 'Patiently', 'Quickly');
    words[3] = Array('Beautiful', 'Elegant', 'Glamorous', 'Sparkling');
    words[4] = Array('Soccer', 'Volleyball', 'Swimming', 'Boxing');  
    wf = {};
    results = {};
    results.status = {};
    results.status.correct = results.status.wrong = 0;
    results.levels = [];
    wf.level = wf.attempts = 1;
    $('#words_flash_div').show();
    showSetting();
  };
  
  showSetting = function(){    
    $('#wf_settings').slideDown('slow');
    $('input[name="wf_settings_fsize"]').each(function(index) {
      $(this).click(function() {
        $('#wf_settings_font').css('font-size', $(this).val());
      });
    });
    $('#wf_settings_ok').click(function(){      
      wf.ftype = $('input[name="wf_settings_type"]:checked').val();
      wf.ftype_text = $('input[name="wf_settings_type"]:checked').parent().text();
      wf.wordlist = $('#wf_settings_wl option:selected').val();
      wf.fsize = $('input[name="wf_settings_fsize"]:checked').val();
      if(wf.wordlist == 0){
        alert("Please select any Word list");
        return false;
      }      
      $('#wf_settings').slideUp('slow',function(){
        $('#wf_instruction').slideDown('slow');
      });
      return true;
    });
    
    $('#wf_instruction_ok').click(function(){
      $('#wf_instruction').slideUp('slow', function(){
      $('#wf_begin').show();
      });      
    });
    
    $('#wf_begin_ok').click(function(){      
      beginExercise();
    });
    
  };
  
  beginExercise = function(){
    $('#wf_container').html('<div style="margin:0 auto;text-align:center;color:#fff;font-weight:bold;">Level '+ wf.level +'</div><div id="wf_words"></div><br><div id="wf_ans_div"><input type="text" class="wf_answer" size="50" id="wf_answer"></div>');
    $('#wf_words').text(words[wf.wordlist].slice(((wf.level - 1) * wf.ftype), (wf.level * wf.ftype)).join(" "));
    $('#wf_words').css('font-size', wf.fsize);
    $('#wf_ans_div').hide();
    
    // If first level hide the begin and show exercise
    if(wf.level == 1){
      $('#wf_begin').slideUp('slow', function(){
        $('#wf_container').slideDown();
        
      });  
    }
    
    $.after((5000 - (250 * (wf.level -1))),function(){
      $('#wf_words').slideUp('slow', function(){
        $('#wf_ans_div').show();
        $('#wf_answer').focus(); 
      });
    });
    
    $('#wf_answer').keydown(function(e){
     if(e.which == 13){
      submitResult();
     }
     return true;
    });    
  };
  
  submitResult = function(){
   results.levels[wf.attempts] = {}
   results.levels[wf.attempts].question = $('#wf_words').text();
   results.levels[wf.attempts].answer = $('#wf_answer').val();
   results.levels[wf.attempts].result = 0;
   
   if($('#wf_words').text().toLowerCase() == $('#wf_answer').val().toLowerCase()){
    $('#wf_container').html('<span class="msg">Anwer Correct..</span>');    
    results.levels[wf.attempts].result = 1;
    results.status.correct += 1; 
    if(wf.level < 20){
     $.after(2000,function(){      
      wf.level += 1;      
      beginExercise();
     });
    }
   }else{
    $('#wf_container').html('<span class="wrong">Anwer Incorret !!!</span><br><span class="wrong">Try Again...</span>');
    results.status.wrong += 1;
    if(results.status.wrong < 4){
     $.after(2000,function(){
      beginExercise();
     });  
    }    
   }
   // Show the Test result 
   if(results.status.wrong == 4  || wf.level == 20){
    $.after(2000,function(){
      showResult();
    });
   }else{
    wf.attempts++; 
   }
  };
  
  showResult = function(){   
  res = '<table border="1" width="100%" cellpadding="0" cellspacing="0">';
  res += '<tr><td align="center" colspan="3">Word Flash - '+ wf.ftype_text +' - Result</td></tr>';
  res += '<tr><td>Name :</td><td colspan="2"> XXX</td></tr>';
  res += '<tr><td>Date :</td><td colspan="2"> '+ new Date() +'</td></tr>';
  res += '<tr><td align="center">Attempts</td><td align="center">Success</td><td align="center">Grade</td></tr>';
  res += '<tr><td align="center">'+ wf.attempts +'</td><td align="center">'+ results.status.correct +'</td><td align="center">'+ Math.ceil((results.status.correct/wf.attempts) * 100 ) +'%</td></tr>';
  res += '<tr><td align="center"><input type="button" value="Print" onclick="window.print()"></td>';
  res += '<td align="center"><input id="wf_rl" type="button" value="Repeat Lesson"></td>';
  res += '<td align="center"><input id="wf_mm" type="button" value="Main Menu"></td></tr></table>';
  $('#wf_container').html(res);
  
  $('#wf_rl').click(function(){      
      $('#wf_container').hide();
      pub.initialize();      
  });
  $('#wf_mm').click(function(){
    $('#wf_container').hide();
    $('#words_flash_div').hide();
    $('#main_menu').show();
  });
  }
  
  return pub;
}(BrianJogging.wordflash || {}));

// Letter flash
BrianJogging.letter_flash = (function(pub) {
  pub.initialize = function(){
    properties = {
      letter_bank : new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'),
      Case : 0,
      type : 2,
      f_size : "large",
      time : 5000,
      level : 1,
      sublevel : 1,
      max_attempts : 20,
      total_attempts : 0,
      wrong_attempts : 0,
      correct_attempts : 0,
      qn_array : new Array(),
      ans_array : new Array(),
      bj_lf_test : {}
    },
    this.showSetting()
  };
  
  pub.showSetting = function(){
    $('#letter_flash_div').show();    
    $('#lf_description').hide();    //hide the description div
    $('#lf_test_main_container').hide();           //hide the test div
    $('#lf_begin').hide();          //Hide the begun button container
    $('lf_test_container').hide();  //hide the test(chat table) div
    $('#lf_cp').show();             //hide the control panel div
    $('#result_container').hide();            //hide the result_container div
    
    //add event to description div button
    $('#desc').click(function(){
      $('#lf_description').hide(); //hide the description div
      $('#lf_test_main_container').show();        //Show the main test div
      $('#lf_begin').show();       //Show the start to begin button
    });
    
    //add event to the begin test button
    $('#lf_begin_test_btn').click(function(){
      $('#lf_begin').hide();         //hide begun test div
      $('lf_test_container').show(); //show test div
      pub.launchLetterFlash();         //start the test
    });
    
    /**
     * Control Panel events
     */
    //add event to the case selection radios
    $("input:radio[name=case]").click(function() {
      properties.Case = $(this).val();
    });
    
    //add event to the test type selection radios
    $("input:radio[name=type]").click(function() {
      properties.type = $(this).val();
    });
    
    //add event to the font size selection radios
    $("input:radio[name=f_size]").click(function() {
      properties.f_size = $(this).val();
    });
    
    //add events to the control panel div button
    $('#start_lf').click(function(){
      $('#lf_cp').hide();           //hide the cpanel div
      $('#lf_description').show();  //show the descriotion div
    });
    
    //assign empty objects to the first level tests
    properties.bj_lf_test[properties.level] = {};
    properties.bj_lf_test[properties.level][properties.sublevel] = {};
  };
  
  pub.launchLetterFlash = function(){
    var l = "";
    var letters = [];
    
    //remove the previos test if there.
    //Technically remove the previous
    //test table element
    $('#test_table').remove();
    
    //Prepare the charecters to be shown for test
    properties.qn_array = new Array();
    for(i=0; i < properties.type; i++){
      l = properties.letter_bank[Math.ceil(Math.random()*25)];
      letters[i] = {id:i,charecter:properties.Case? l.toUpperCase() : l,size : properties.f_size,tabindex:i+1};
      properties.qn_array.push(l);
    }
        
    var context = {
      letter : letters
    };
    
    //create the html for the test
    var source   = $("#template-letter-flash").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    
    $('#lf_test_container').append(html);
    
    //first hide the char <span> for a while
    $('span[id^=test_char_span_]').hide();
    
    //make chat <td> beckground to yellow
    $('#chars > td').css("background-color","yellow");
    
    //first hide the inputs
    $('#inputs').hide();
    
    //show yelow background to the user for 2 seconds
    //after show the test
    $.after(0.5, "second", function() {
      pub.showTest();
    });
  }
  
  //Start the test
  pub.showTest = function(){
    //apply white backgrounf while show the chars
    $('#chars > td').css("background-color","white");
    
    //show the char appering places to the user
    $('span[id^=test_char_span_]').show();
    
    //apply the events after the time delay
    $.after(properties.time, function() {
      //HIde the charecters
      $('span[id^=test_char_span_]').hide();
      
      //show the textboxes
      $('#inputs').show();
      
      //set the focus to the first textbox
      $('#test_input_0').focus();
    });
    
    //add KeyUp events to the input boxes
    properties.ans_array = new Array();
    $('input[name^=test_input_]').each(function(){
      $(this).keyup(function(){
        test_ans_lettes = new Array();
        var str = $(this).attr('id');
        
        if($(this).attr('id') != 'test_input_'+ (properties.type - 1)){
          //move the focus to the next textbox
          $('#test_input_'+ ((Number(str.substr(str.length-1)) + 1))).focus();
          
          //add the ans char into the array
          properties.ans_array.push($(this).val());
          
          //Disable the current textbox
          $(this).attr('disabled','disabled');
        }
        else{
          //add the ans char into the array
          properties.ans_array.push($(this).val());
          
          //Disable the current textbox
          $(this).attr('disabled','disabled');
          
          pub.computeResults();
        }
      });
    });
  }
  
  pub.computeResults = function(){
    //Increase the total No of attempts
    properties.total_attempts++;
    properties.bj_lf_test[properties.level][properties.sublevel] = {qn_chars:properties.qn_array,ans_chars:properties.ans_array};
    
    var level_flag = true;
    for(i=0; i < properties.type; i++){
      //compare qn chars against ans chars
      if(properties.ans_array[i] != properties.qn_array[i]){
        level_flag = false;
      }
    }
    
    //if answers are correct
    if(level_flag){
      //if total 20 levels complited
      if(properties.level == 21){
        pub.quitAndShowResult();    //quit the test and show the results
      }
      else{ //if level is lessthen 20
        alert("Congrats.. You successfully complete Level - " +properties.level);
        properties.sublevel = 1;                         //initiate the sublevel to 1 for the next level test
        properties.time = properties.time - 250;         //Decrease the time level 250 ms for the next level test
        properties.correct_attempts++;                   //Increase the correct attempts
        properties.level++;                              //Increase the level of the exam
        properties.bj_lf_test[properties.level] = {};    //Declare object for the next level
        pub.launchLetterFlash();                           //Start the next level exam
      }
    }
    else{ //if the answer is not correct
      if(properties.sublevel == 3){
        pub.quitAndShowResult(); //quit and show the result
      }
      else{
        alert("InCorrect.... Try again");
        properties.wrong_attempts++;                                       //increase the wrong attempts
        properties.sublevel++;                                             //increase the sublevel
        properties.bj_lf_test[properties.level][properties.sublevel] = {}; //Declare object for the empty level
        pub.launchLetterFlash();                                             //Start the new test
      }
    }
  }
  
  pub.quitAndShowResult = function(){
    //remove the test.
    //Technically remove the previous
    //test table element
    $('#test_table').remove();
    
    //set the total attempts value
    $('#attempts').text(properties.total_attempts);
    //sett he correct attempts value
    $('#correct').text((properties.correct_attempts ? properties.correct_attempts : '0' ));
    //Set the grade
    $('#grade').text(Math.ceil(((properties.correct_attempts/properties.total_attempts) * 100)) +  '%');
    //set the highest level achived
    $('#level').text(((properties.level - 1) ? (properties.level - 1) : '0'));
    
    $('#lf_rl').click(function(){
     pub.initialize();
    });
    
    $('#lf_mm').click(function(){
      $('#result_container').hide();
      $('#letter_flash_div').hide();
      $('#main_menu').show();
    });
    
    //show the results
    $('#result_container').show();
    
    //$('#letter_flash_div').children().each(function(){
    //  $(this).remove(); 
    //});
  }
  
  return pub;
}(BrianJogging.letter_flash || {}));


BrianJogging.eyemomvent = (function(pub) {
    pub.initialize = function(){
        em_input=new Array();
        em_input[0]="The origin of the Statue";
        em_input[1]="of Liberty project is";
        em_input[2]="generally traced to a ";
        em_input[3]="comment made by French law";
        em_input[4]="professor and politician";
        em_input[5]="�douard Ren� de Laboulaye";
        em_input[6]="in mid-1865. Inafter-dinner";
        em_input[7]="conversation at his home";
        em_input[8]="near Versailles,Laboulaye,";
        em_input[9]="an ardent supporter of ";
        em_input[10]="the Union in the American";
        em_input[11]="Civil War, stated";
        em_input[12]="If a monument should ";
        em_input[13]="rise in the United States";
        em_input[14]="as a memorial to their";
        em_input[15]="independence, I should think";
        em_input[16]="it only natural if it";
        em_input[17]="were built by united";
        em_input[18]="effort a common work";
        em_input[19]="of both our nations";
        $('#eye_moment').show();
        em_pos1 = 0;
        em_max=300;
        em_tip_top=20;
        em_count=0;
        em_sp=3000;
        $('#em_main').click(function(){
          $('#eye_moment').hide();
          $('#main_menu').show();
        });
        $('#em_next').click(function(){
          pub.em_next();  
        });
        $('#em_begin').click(function(){
          pub.em_speed();  
        });
        $('#em_start').click(function(){
          pub.em_start();  
        });
        $('#em_init').slideDown('slow');
    }
    
    pub.em_flash = function() {
       $('#em_move').html(em_input[em_count]);
       var em_end =screen.width;
       em_pos1 += em_end-210;
       if (em_count==0) {
          em_pos1=0;
        }
       if (em_pos1 > em_end) {
           em_pos1 = 0;
        }
       if(em_count%2==0) { 
         if(em_tip_top<em_max) {
          em_tip_top+=50;
          }
          else{
          em_tip_top=20;
          }
        }
       if(em_count==em_input.length) {
          alert("first eye test end");
          window.location.reload( true );
          return true;
        }
      
       if(em_pos1 == 0){
        $("#em_letter").css("right", ''); 
        $("#em_letter").css("left", '10px');        
       }else{
        $("#em_letter").css("left", ''); 
        $("#em_letter").css("right", '10px')
       }
       $("#em_letter").css("top", em_tip_top);
       
     
       $.after(em_sp,function(){
        pub.em_flash();
        });
       em_count++;
       return true;
    }
    pub.em_next = function() {
        $('#em_init').css("display",'none');
        $('#em_speed').show();
        $('#em_speed').css("position",'relative');
        $('#em_speed').css("width",500);
        $('#em_speed').css("margin",'0px auto');
    }
    pub.em_speed = function() {
       var em_spe=$('#speed').val();
       if(em_spe.length==0) {
         alert("Enter the speed");
        }
       else{
            $('#em_speed').css("display","none");
            $('#em_instuct').css("display","block");
            em_sp = em_sp/em_spe;
        }
       
    }
    pub.em_start = function() {
        $('#em_instuct').css("display","none");
        pub.em_flash(); 
    }
    pub.em_isNumberKey=function(evt) {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            
            return false;
         }
         return true;
    }
    
  return pub;
}(BrianJogging.eyemomvent || {}));


// Dom Ready event
$(document).ready(function(){
  $('.word').click(function(){
    $('#main_menu').hide();
    BrianJogging.wordflash.initialize();
  });
  $('.letter').click(function(){
    $('#main_menu').hide();
    BrianJogging.letter_flash.initialize();
  });
  
  $('.eye').click(function(){
    $('#main_menu').hide();
    BrianJogging.eyemomvent.initialize();
  });    
});