/*
Arduinoe Code to run the Sparkfun TB6612FNG 1A Dual Motor Driver

This code conducts a few simple manoeuvres to illustrate the functions:
  - motorDrive(motorNumber, motorDirection, motorSpeed)
  - motorBrake(motorNumber)
  - motorStop(motorNumber)
  - motorsStandby

Connections:
- Pin 3 ---> PWMA
- Pin 8 ---> AIN2
- Pin 9 ---> AIN1
- Pin 10 ---> STBY
- Pin 11 ---> BIN1
- Pin 12 ---> BIN2
- Pin 5 ---> PWMB

- Motor 1: A01 and A02
- Motor 2: B01 and B02

*/

// variables needed to sonar
long pulse, inches, cm, largeDistance, shortDistance;

//Motor 1
const int pinAIN1 = 9; //Direction
const int pinAIN2 = 8; //Direction
const int pinPWMA = 3; //Speed

//Motor 2
const int pinBIN1 = 11; //Direction
const int pinBIN2 = 12; //Direction
const int pinPWMB = 5; //Speed
//Standby
const int pinSTBY = 10;
const int LED = 13;
const int IRpin = 1; 
const int SONAR = 7; 

//Constants to help remember the parameters
static boolean turnCW = 0;  //for motorDrive function
static boolean turnCCW = 1; //for motorDrive function
static boolean motor1 = 0;  //for motorDrive, motorStop, motorBrake functions
static boolean motor2 = 1;  //for motorDrive, motorStop, motorBrake functions
char val;

void setup()
{
//Set the PIN Modes
  pinMode(pinPWMA, OUTPUT);
  pinMode(pinAIN1, OUTPUT);
  pinMode(pinAIN2, OUTPUT);

  pinMode(pinPWMB, OUTPUT);
  pinMode(pinBIN1, OUTPUT);
  pinMode(pinBIN2, OUTPUT);

  pinMode(pinSTBY, OUTPUT);
  pinMode(LED, OUTPUT);
  pinMode(SONAR, INPUT);
  
  Serial.begin(57600);  

}

void loop()
{
  
  //Pulse Width representation with a scale factor of 147 uS per Inch.
  pulse = pulseIn(SONAR, HIGH);
  //147uS per inch
  inches = pulse/147;
  //change inches to centimetres
  cm = inches * 2.54;  
  if(largeDistance != cm){
    largeDistance = cm;
    Serial.print("large => "); 
    Serial.print(largeDistance); 
    Serial.print("cm"); 
    Serial.println(); 
  }
  
  // value from sensor * (5/1024) - if running 3.3.volts then change 5 to 3.3
  float volts = analogRead(IRpin)*0.0048828125;   
  // worked out from graph 65 = theretical distance / (1/Volts)S 
  float distance = 65*pow(volts, -1.10);          
  if(shortDistance != distance){
    shortDistance = distance;
    Serial.print("short => "); 
    Serial.print(shortDistance); 
    Serial.print("cm"); 
    Serial.println(); 
  }
    
  if( Serial.available() )         // if data is available to read
  {
    val = Serial.read();          // read it and store it in 'val'
    digitalWrite(LED, HIGH);

    // say what you got:
    Serial.print("I received: ");
    Serial.println(val);
    // delay 10 milliseconds to allow serial update time
    delay(10);

    if( val == 'F' )                     // if 'H' was received
    {
      //Drive both motors CW, full speed
      motorDrive(motor1, turnCW, 255);
      motorDrive(motor2, turnCW, 255);
    }else if( val == 'B')
    {
      motorDrive(motor2, turnCCW, 255);      
      motorDrive(motor1, turnCCW, 255);
    }else if( val == 'L')
    {
        motorDrive(motor1, turnCW, 192);
        motorDrive(motor2, turnCCW, 192);
    }else if( val == 'R')
    {
        motorDrive(motor2, turnCW, 192);
        motorDrive(motor1, turnCCW, 192);
             
    }else if( val == 'G') // forward Left
    {
        motorDrive(motor1, turnCW, 255);
        motorDrive(motor2, turnCW, 100);
    }else if( val == 'I') // forward right
    {
        motorDrive(motor1, turnCW, 100);
        motorDrive(motor2, turnCW, 255);
        
    }else if( val == 'H') // Back Left
    {
        motorDrive(motor1, turnCCW, 255);
        motorDrive(motor2, turnCCW, 100);
    }else if( val == 'J') // back right
    {
        motorDrive(motor1, turnCCW, 100);
        motorDrive(motor2, turnCCW, 255);
    
    } else { 
      //Apply Brakes, then into Standby
      motorBrake(motor1);
      motorBrake(motor2);
      motorsStandby();
      
    }
  }else{
    delay(100);
  }
}

void demo()
{
 
  //Drive both motors CW, full speed
  motorDrive(motor1, turnCW, 255);
  motorDrive(motor2, turnCW, 255);
 
  //Keep driving for 2 secs
  delay(2000);

  //Turn towards motor1: Stop Motor1, slow Motor2
  motorStop(motor1);
  motorDrive(motor2, turnCW, 192);
 
  //Keep turning for 2 secs
  delay(2000);

  //Turn in opposite direction: Stop Motor2, slow Motor1
  motorDrive(motor1, turnCW, 192);
  delay(250);
  motorStop(motor2);

  //Keep turning for 2 secs
  delay(2000);

  //Straighten up
  motorDrive(motor2, turnCW, 192);
  delay(500);
 
  //Put motors into Standby
  motorsStandby();
  delay(1000);
 
  //Do a tight turn towards motor1: Motor2 forward, Motor1 reverse
  motorDrive(motor1, turnCCW, 192);
  motorDrive(motor2, turnCW, 192);
 
  //Keep turning for 2 secs
  delay(2000);
 

  //Apply Brakes, then into Standby
  motorBrake(motor1);
  motorBrake(motor2);
  motorsStandby();

  //Stand still for 5 secs, then we do it all over again...
  delay(5000);

}

void motorDrive(boolean motorNumber, boolean motorDirection, int motorSpeed)
{
  /*
  This Drives a specified motor, in a specific direction, at a specified speed:
    - motorNumber: motor1 or motor2 ---> Motor 1 or Motor 2
    - motorDirection: turnCW or turnCCW ---> clockwise or counter-clockwise
    - motorSpeed: 0 to 255 ---> 0 = stop / 255 = fast
  */

  boolean pinIn1;  //Relates to AIN1 or BIN1 (depending on the motor number specified)

 
//Specify the Direction to turn the motor
  //Clockwise: AIN1/BIN1 = HIGH and AIN2/BIN2 = LOW
  //Counter-Clockwise: AIN1/BIN1 = LOW and AIN2/BIN2 = HIGH
  if (motorDirection == turnCW)
    pinIn1 = HIGH;
  else
    pinIn1 = LOW;

//Select the motor to turn, and set the direction and the speed
  if(motorNumber == motor1)
  {
    digitalWrite(pinAIN1, pinIn1);
    digitalWrite(pinAIN2, !pinIn1);  //This is the opposite of the AIN1
    analogWrite(pinPWMA, motorSpeed);
  }
  else
  {
    digitalWrite(pinBIN1, pinIn1);
    digitalWrite(pinBIN2, !pinIn1);  //This is the opposite of the BIN1
    analogWrite(pinPWMB, motorSpeed);
  }
   
 

//Finally , make sure STBY is disabled - pull it HIGH
  digitalWrite(pinSTBY, HIGH);

}

void motorBrake(boolean motorNumber)
{
/*
This "Short Brake"s the specified motor, by setting speed to zero
*/

  if (motorNumber == motor1)
    analogWrite(pinPWMA, 0);
  else
    analogWrite(pinPWMB, 0);
   
}


void motorStop(boolean motorNumber)
{
  /*
  This stops the specified motor by setting both IN pins to LOW
  */
  if (motorNumber == motor1) {
    digitalWrite(pinAIN1, LOW);
    digitalWrite(pinAIN2, LOW);
  }
  else
  {
    digitalWrite(pinBIN1, LOW);
    digitalWrite(pinBIN2, LOW);
  } 
}


void motorsStandby()
{
  /*
  This puts the motors into Standby Mode
  */
  digitalWrite(pinSTBY, LOW);
}
