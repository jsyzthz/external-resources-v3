#ifndef CircleBitLittle_h
#define CircleBitLittle_h
#include <Arduino.h>
 
#include <Keyboard.h>


//板载RGB
#define RGBPIN 3
#define NUMPIXELS 8


#define BUZZER 7   //蜂鸣器

#define LIGHT A0 //光线传感器

#define TRIG_PIN  22 //超声波测距
#define ECHO_PIN  23


#define NTD1 294
#define NTD2 330
#define NTD3 350
#define NTD4 393
#define NTD5 441
#define NTD6 495
#define NTD7 556
#define NTDL1 147
#define NTDL2 165
#define NTDL3 175
#define NTDL4 196
#define NTDL5 221
#define NTDL6 248
#define NTDL7 278
#define NTDH1 589
#define NTDH2 661
#define NTDH3 700
#define NTDH4 786
#define NTDH5 882
#define NTDH6 990
#define NTDH7 1120

//MakeyMakey按键延时值
#define TARGET_LOOP_TIME 1388  // (1/30 秒) / 24 次采样 = 每次采样 744 微秒 


class CircleBitLittle
{
	public:
		CircleBitLittle();
		
		void blink();
		void tone(uint16_t frequency, uint32_t duration);
		int readAnalog(byte ports );
		bool readDigital(byte ports );

		void runMotor(byte ports,int value);

		byte getPWMPin(byte ports);
		byte getAnalogPin(byte ports);
		long getDistanceCM(byte ports);
		
		void initializeKey(byte pin);
		bool checkPressKey(byte pin);
		void pressKeyboard(byte pin, int key);
		void delayForKey();
		
		long bluetoothRead();

		 
		 

	private:
		int level;
		long btPreValue; //蓝牙上次接收到的值
		double btDelayTime; //蓝牙接收间隔时间
		
		 

 

 

///////////////////////////////////////
// makeymakey按键结构体 ///////////////
///////////////////////////////////////
typedef struct {
  byte measurementBuffer[3];
  boolean oldestMeasurement;
  byte bufferSum;
  bool isKeyDown;
}
MakeyMakeyInput;

MakeyMakeyInput inputKey[5];

///////////////////////////////////
// makeymakey按键累加器 ///////////
///////////////////////////////////
int prevTime = 0;
byte byteCounter = 0;
byte bitCounter = 0;

};

#endif