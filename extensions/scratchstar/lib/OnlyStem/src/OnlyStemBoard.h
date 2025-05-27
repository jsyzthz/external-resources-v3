#ifndef OnlyStemBoard_h
#define OnlyStemBoard_h
#include <Arduino.h>
#include <MPU6050.h>
#include <Keyboard.h>


//板载RGB
#define RGBPIN 8
#define NUMPIXELS 8


#define BUZZER 6   //蜂鸣器

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


class OnlyStemBoard
{
	public:
		OnlyStemBoard();
		
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

		void inityro();
		void gyroMeasure();
		float getAngle (int xyz);

	private:
		int level;
		long btPreValue; //蓝牙上次接收到的值
		double btDelayTime; //蓝牙接收间隔时间
		
		//陀螺仪

unsigned long _lastGyroTime = 0; //上次测量时间
float gyroDt;                                   //微分时间

int16_t ax, ay, az, gx, gy, gz;             //加速度计陀螺仪原始数据
float aax=0, aay=0,aaz=0, agx=0, agy=0, agz=0;    //角度变量
long axo = 0, ayo = 0, azo = 0;             //加速度计偏移量
long gxo = 0, gyo = 0, gzo = 0;             //陀螺仪偏移量

float pi = 3.1415926;
float AcceRatio = 16384.0;                  //加速度计比例系数
float GyroRatio = 131.0;                    //陀螺仪比例系数

uint8_t n_sample = 8;                       //加速度计滤波算法采样个数
float aaxs[8] = {0}, aays[8] = {0}, aazs[8] = {0};         //x,y轴采样队列
long aax_sum, aay_sum,aaz_sum;                      //x,y轴采样和

float a_x[10]={0}, a_y[10]={0},a_z[10]={0}; //加速度计协方差计算队列
float Px=1, Rx, Kx, Sx;             //x轴卡尔曼变量
float Py=1, Ry, Ky, Sy;             //y轴卡尔曼变量
float Pz=1, Rz, Kz, Sz;             //z轴卡尔曼变量

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