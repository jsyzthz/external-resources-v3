#include "TPR_SSD1306_I2C.h"


TPR_SSD1306_I2C::TPR_SSD1306_I2C()
{

}

#if defined(ESP_PLATFORM) || defined(NRF5)
inline void TPR_SSD1306_I2C::drawPixel(int16_t x, int16_t y, uint16_t color)
{
  int16_t         bufferAddr = x + y / 8 * 128;
  writeCmd(SSD1306_COLUMNADDR);
  writeCmd(x);
  writeCmd(x);
  writeCmd(SSD1306_PAGEADDR);
  writeCmd(y / 8);
  writeCmd(y / 8);
  writeBufferPixel(bufferAddr, y % 8, color);
  Wire.begin();
  SSD1306_I2CBEGIN();
  Wire.beginTransmission(I2CAddr);
  Wire.write(0x40);
  Wire.write(SSD1306_FrameBuffer[bufferAddr]);
  Wire.endTransmission();
  SSD1306_I2CEND();
}
#endif

inline void TPR_SSD1306_I2C::writeCmd(uint8_t cmd)
{
  SSD1306_I2CBEGIN();
  Wire.beginTransmission(I2CAddr);
  Wire.write(0x80);
  Wire.write(cmd);
  Wire.endTransmission();
  SSD1306_I2CEND();
}


inline void TPR_SSD1306_I2C::writeDatBytes(uint8_t* pDat, uint16_t count)
{
  SSD1306_I2CBEGIN();
  Wire.beginTransmission(I2CAddr);
  Wire.write(0x40);
  while(count --) {
    Wire.write(*pDat);
    pDat ++;
  }
  Wire.endTransmission();
  SSD1306_I2CEND();
}


