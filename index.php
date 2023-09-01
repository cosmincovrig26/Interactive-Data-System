
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="style.css" rel="stylesheet">
  <link rel="stylesheet" href="domarrow.css">
  <script src="domarrow.js"></script>
  <script src="https://cdn.plot.ly/plotly-2.8.3.min.js"></script>
  <script defer src="script.js"></script>
  <title>Quiz App</title>
</head>
<body onload="showInfo()">
   <div class="container">
    <div id="info-container">
      <div class="test3">
        <div class="gridwrapper">
          <div><img src="backbutton.jpg" id= "myown-btn" alt="Go back" width="80" height="80"></div>
          <div id = A1 class="grid-item A1">Joseph - CEO</div>
          <div id = B4 class="grid-item B4 pA1">Angela - Name Partner</div>
          <div id = B1 class="grid-item B1 pA1">Gary - General Manager</div>
          <div id = B5 class="grid-item B5 pA1">Bill - IT Specialist</div>
          <div id = C4 class="grid-item C4 pB4">Amber - Senior Partner</div>
          <div id = C2 class="grid-item C2 pB1">Melissa - Team Leader</div>
          <div id = C3 class="grid-item C3 pB1">Alex - Team Leader</div>
          <div id = D6 class="grid-item D6 pC4">Lewis - Junior Partner</div>
          <div id = D2 class="grid-item D2 pC4">Matthew - Associate</div>
          <div id = E6  class="grid-item E6 pD6">Jack - Associate</div>
        </div>
      </div>
    </div>
    <div id="question-container" class="hide">
      <div id="question">Question</div>
      <div id="answer-buttons" class="btn-grid">
        <button class="btn">Answer 1</button>
        <button class="btn">Answer 2</button>
        <button class="btn">Answer 3</button>
        <button class="btn">Answer 4</button>
      </div>
    </div>
    <div class="controls">
      <button id="start-btn" class="start-btn btn hide">---></button>
      <button id="show-data-btn" class="show-btn btn">---></button>
      <button id="next-btn" class="next-btn btn hide">---></button>
      <button id="end-btn" class ="end-btn btn hide">---></button>
      <button id="switch-btn" class="switch-btn btn hide">Switch View</button>

      <form action= "index.php" method="POST">
        <div id="age-and-gender" class="hide">
          <label for="age">Age:</label>
          <input type="text" id="age" name="age">
          <label for="gender">Gender</label>
          <select id="gender" name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <input id="totalresult" class="hide" type="text" name="totalresult">
        <button id="submit-btn" class="submit-btn btn hide" type="submit" name="submit">Submit</button>
      </form>
    </div>
  </div>

<?php
  include_once 'sqlconn.php';



  if (isset($_POST['submit']))
  {
    $result = $_POST['totalresult'];
    $resultArray = explode(',',$result);
    $sql = "INSERT INTO participant(age, gender, test_one_mp_result, test_one_tf_result,
    test_one_result, test_two_mp_result, test_two_tf_result, test_two_result, test_three_mp_result, test_three_tf_result, test_three_result)
    VALUES ('$_POST[age]','$_POST[gender]','$resultArray[0]','$resultArray[1]','$resultArray[2]','$resultArray[3]','$resultArray[4]','$resultArray[5]','$resultArray[6]','$resultArray[7]','$resultArray[8]');";
    $res = mysqli_query($conn, $sql);
  }

?>
<div id='arrows' class='hide'>
  <connection class ='arrow A1' from="#B4" to="#A1" color="purple" fromX="1" tail onlyVisible></connection>
  <connection class='arrow A1' from="#B1" to="#A1" color="purple" fromY="0" tail onlyVisible></connection>
  <connection class='arrow A1' from="#B5" to="#A1" color="purple" fromX="0" tail onlyVisible></connection>
  <connection class='arrow B4' from="#C4" to="#B4" color="purple" fromY="0" tail onlyVisible></connection>
  <connection class='arrow C4' from="#D6" to="#C4" color="purple" fromY="0" tail onlyVisible></connection>
  <connection class='arrow C4' from="#D2" to="#C4" color="purple" fromY="0.5" tail onlyVisible></connection>
  <connection class='arrow D6' from="#E6" to="#D6" color="purple" fromY="0" tail onlyVisible></connection>
  <connection class='arrow B1' from="#C3" to="#B1" color="purple" fromY="0.5" tail onlyVisible></connection>
  <connection class='arrow B1' from="#C2" to="#B1" color="purple" fromY="0" tail onlyVisible></connection>
</div>
</body>
</html>
