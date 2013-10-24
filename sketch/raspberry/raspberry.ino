/*
Arduinoe Code to run the Sparkfun TB6612FNG 1A Dual Motor Driver

Functions:
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
  /*
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
   */
}

har inData[20]; // Allocate some space for the string
char inChar=-1; // Where to store the character read
byte index = 0; // Index into array; where to store the character

char Comp(char* This) {
    while (Serial.available() > 0) // Don't read unless
                                   // there you know there is data
    {
        if(index < 19) // One less than the size of the array
        {
            inChar = Serial.read(); // Read a character
            inData[index] = inChar; // Store it
            index++; // Increment where to write next
            inData[index] = '\0'; // Null terminate the string
        }
    }

    if (strcmp(inData,This)  == 0) {
        for (int i=0;i<19;i++) {
            inData[i]=0;
        }
        index=0;
        return(0);
    }
    else {
        return(1);
    }
}

void loop()
{
    if (Comp("m1 on")==0) {
        Serial.write("Motor 1 -> Online\n");
    }
    if (Comp("m1 off")==0) {
        Serial.write("Motor 1 -> Offline\n");
    }
}


/*

IP-6533

if (Serial.available() > 0) {
    int incomingByte = Serial.read();
 
    if (incomingByte == 0x01) {
      digitalWrite(outputPin, HIGH);
    } else if (incomingByte == 0x00) {
      digitalWrite(outputPin, LOW);
    }
  }
 */
 
 