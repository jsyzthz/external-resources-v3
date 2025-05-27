#ifndef TPR_SSD1306_H
#define TPR_SSD1306_H
#include "Arduino.h"
#include "TPR_CHfont.h"
#include "Wire.h"


#define SSD1306_JUMPTABLE_BYTES 4
#define SSD1306_JUMPTABLE_LSB   1
#define SSD1306_JUMPTABLE_SIZE  2
#define SSD1306_JUMPTABLE_WIDTH 3
#define SSD1306_JUMPTABLE_START 4
#define SSD1306_WIDTH_POS 0
#define SSD1306_HEIGHT_POS 1
#define SSD1306_FIRST_CHAR_POS 2
#define SSD1306_CHAR_NUM_POS 3

// Display commands
#define SSD1306_CHARGEPUMP 0x8D
#define SSD1306_COLUMNADDR 0x21
#define SSD1306_COMSCANDEC 0xC8
#define SSD1306_COMSCANINC 0xC0
#define SSD1306_DISPLAYALLON 0xA5
#define SSD1306_DISPLAYALLON_RESUME 0xA4
#define SSD1306_DISPLAYOFF 0xAE
#define SSD1306_DISPLAYON 0xAF
#define SSD1306_EXTERNALVCC 0x1
#define SSD1306_INVERTDISPLAY 0xA7
#define SSD1306_MEMORYMODE 0x20
#define SSD1306_NORMALDISPLAY 0xA6
#define SSD1306_PAGEADDR 0x22
#define SSD1306_SEGREMAP 0xA0
#define SSD1306_SETCOMPINS 0xDA
#define SSD1306_SETCONTRAST 0x81
#define SSD1306_SETDISPLAYCLOCKDIV 0xD5
#define SSD1306_SETDISPLAYOFFSET 0xD3
#define SSD1306_SETHIGHCOLUMN 0x10
#define SSD1306_SETLOWCOLUMN 0x00
#define SSD1306_SETMULTIPLEX 0xA8
#define SSD1306_SETPRECHARGE 0xD9
#define SSD1306_SETSEGMENTREMAP 0xA1
#define SSD1306_SETSTARTLINE 0x40
#define SSD1306_SETVCOMDETECT 0xDB
#define SSD1306_SWITCHCAPVCC 0x2

#define BEGIN_ERR_OK          0
#define BEGIN_ERR_ERR         -1
#define BEGIN_WAR_NOTEST      1

#define DISPLAY_ERR_OK                0
#define DISPLAY_ERR                   -1
#define DISPLAY_ERR_PARAM             -2
#define DISPLAY_ERR_NOTSUPPORT        -3
#define DISPLAY_ERR_MEMOVER           -4


#define DRAW_UPPER_RIGHT 0x01
#define DRAW_UPPER_LEFT  0x02
#define DRAW_LOWER_LEFT 0x04
#define DRAW_LOWER_RIGHT  0x08
#define DRAW_ALL (U8G2_DRAW_UPPER_RIGHT|U8G2_DRAW_UPPER_LEFT|U8G2_DRAW_LOWER_RIGHT|U8G2_DRAW_LOWER_LEFT)


enum eROTATION {
    eROTATION_0,
    eROTATION_90,
    eROTATION_180,
    eROTATION_270
};

typedef struct chcode{
    uint16_t unicode;
    uint32_t utf8;
    uint16_t gb2312;
    uint8_t matrix[32];
}chCode;

class TPR_SSD1306
{
    public:

    TPR_SSD1306();

//#if defined(ESP_PLATFORM) || defined(NRF5)
    uint8_t       SSD1306_FrameBuffer[1024] = {0};
   // void          drawVLine(int16_t x, int16_t y, int16_t height);
    //void          drawHLine(int16_t x, int16_t y, int16_t width, uint16_t color = 1);
    void          VLine(int16_t x, int16_t y, int16_t h);
    void          HLine(int16_t x, int16_t y, int16_t w);
    void          line(int16_t x0, int16_t y0, int16_t x1, int16_t y1);
    void          rect(int16_t x, int16_t y, int16_t width, int16_t height, bool fill = false);
    void          drawImage(int16_t x, int16_t y, int16_t width, int16_t height, const uint8_t *image);
	 
    void          lineWidth(uint8_t w = 1);
    void          point(int16_t x, int16_t y, uint8_t color = 1);
    void          setCursorXY(int16_t x, int16_t y);
    void          drawCircle(int16_t x0, int16_t y0, int16_t r);
    void          fillCircle(int16_t x0, int16_t y0, int16_t r);
    void          drawVLine(int16_t x, int16_t y, int16_t height_);
	//void          drawHLine(int16_t x, int16_t y, int16_t height_);
    void          draw_ellipse(int16_t x0, int16_t y0, int16_t rx, int16_t ry, uint8_t option);
    void          draw_ellipse_section(  int16_t x, int16_t y, int16_t x0, int16_t y0, uint8_t option);
    void          draw_filled_ellipse_section(int16_t x, int16_t y, int16_t x0, int16_t y0, uint8_t option);
	void          draw_filled_ellipse(int16_t x0, int16_t y0, int16_t rx, int16_t ry, uint8_t option);
	void          regionalRefresh(int16_t x, int16_t y, int16_t w, int16_t h);
	void          display_start();
	void          rect_c(int16_t x, int16_t y, int16_t width, int16_t height, bool fill);
	void          display_prepare();
//#endif

    virtual void        writeCmd(uint8_t cmd) = 0;
    virtual void        writeDatBytes(uint8_t* pDat, uint16_t count) = 0;

    int16_t       begin(uint8_t I2CAddr_ = 0x3c);
    void          displayON(void);
    void          displayOFF(void);
    void          fillScreen(uint16_t color);

    void          setTextColor(uint16_t color);
    void          setCursor(int16_t x, int16_t y);
    void          setCursorLine(int8_t line);
    void          setChCode(const chCode *tp);

    void          print(const char *pCh);
    void          print(String str){print((const char *)str.c_str());}
    void          print(uint32_t i);
    void          print(int32_t i);
	void          print(int i);
    void          print(double f, int precision = 10);
    void          print(float f){print((double)f);}
    void          print(byte i){print((uint32_t)i);}
    void          print(uint16_t i){print((uint32_t)i);}
    void          print(uint64_t i){print((uint32_t)i);}
	//void        writeBufferPixel(int16_t x, int16_t y, uint16_t color);
    //void        regionalRefresh(int16_t x, int16_t y, int16_t w, int16_t h);
	 
#ifdef ESP_PLATFORM
    void          print(long unsigned int i){print((uint32_t)i);}
    void          print(long int i){print((int32_t)i);}
#endif

    void          printLine(const char *pCh);
    void          printLine(String str){printLine((const char *)str.c_str());}
    void          printLine(uint32_t i);
    void          printLine(int32_t i);
    void          printLine(double f, int precision = 10);
    void          printLine(float f){printLine((double)f);}
    void          printLine(byte i){printLine((uint32_t)i);}
    void          printLine(uint16_t i){printLine((uint32_t)i);}
    void          printLine(uint64_t i){printLine((uint32_t)i);}
	
#ifdef ESP_PLATFORM
    void          printLine(long unsigned int i){printLine((uint32_t)i);}
#endif

    int16_t       setRotaion(eROTATION eRotation);


    protected:

    int         getDirection(int value);
    int         ternaryExpression(bool condition, int o1, int o2);
    void        showMatrix(uint8_t x, uint8_t y, int width, int height, const uint8_t *pBuf, bool back);
    int16_t     textColor;
    int16_t     printfX, printfY;
    int8_t      textLine;
    chCode      *tpCode;
    uint8_t     _lineWidth;
    uint8_t     I2CAddr = 0x3c;

//#if defined(ESP_PLATFORM) || defined(NRF5)
    void        writeBufferPixel(int16_t x, int16_t y, uint16_t color);
    //void        regionalRefresh(int16_t x, int16_t y, int16_t w, int16_t h);
//#endif
};

#endif
