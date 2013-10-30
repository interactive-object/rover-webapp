int ENA=6;//connected to Arduino's port 5(output pwm)
int IN1=4;//connected to Arduino's port 2
int IN2=5;//connected to Arduino's port 3

int ENB=7;//connected to Arduino's port 6(output pwm)
int IN3=9;//connected to Arduino's port 4
int IN4=8;//connected to Arduino's port 7

char val;

void setup()
{
 pinMode(ENA,OUTPUT);//output
 pinMode(ENB,OUTPUT);
 pinMode(IN1,OUTPUT);
 pinMode(IN2,OUTPUT);
 pinMode(IN3,OUTPUT);
 pinMode(IN4,OUTPUT);
 
 //digitalWrite(ENA,HIGH);
 digitalWrite(IN1,LOW); 
 digitalWrite(IN2,LOW);//setting motorA's directon
 
 //digitalWrite(ENB,HIGH);//stop driving
 digitalWrite(IN3,LOW);
 digitalWrite(IN4,LOW);//setting motorB's directon
 
 Serial.begin(57600);
  
 //Serial.print("F");
}


void loop()
{
  
    if( Serial.available() )         // if data is available to read
  {
    val = Serial.read();          // read it and store it in 'val'
    

    // say what you got:
    Serial.print("I received: ");
    Serial.println(val);
    // delay 10 milliseconds to allow serial update time
    delay(10);

    if( val == 'F' )                     // if 'H' was received
    {
       forward();
    }else if( val == 'B')
    {
      backward();
    }else if( val == 'L')
    {
      left();
    }else if( val == 'R')
    {
      right();   
    }else if( val == 'T')
    {
      straight();         
    }else if( val == 'S')
      brake();
    }
  
  
}



void backward()
{
  /*
  This puts the motors into Standby Mode
  */
   analogWrite(ENB,255);
   digitalWrite(IN3, HIGH);
   digitalWrite(IN4, LOW);
   
}

void forward()
{
  /*
  This puts the motors into Standby Mode
  */
   analogWrite(ENB,255);
   digitalWrite(IN4, HIGH);
   digitalWrite(IN3, LOW);
}


void right()
{
  /*
  This puts the motors into Standby Mode
  */
   analogWrite(ENA,255);
   digitalWrite(IN1, LOW);
   digitalWrite(IN2, HIGH);
   
}

void left(){
     analogWrite(ENA,255);
   digitalWrite(IN1, HIGH);
   digitalWrite(IN2, LOW);
}

void straight()
{
  digitalWrite(IN1, LOW);
   digitalWrite(IN2, LOW);
}

void brake()
{
    digitalWrite(IN3, LOW);
   digitalWrite(IN4, LOW);
}




