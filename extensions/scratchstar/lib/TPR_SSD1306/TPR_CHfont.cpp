#include "TPR_CHfont.h"

TPR_CHfont::TPR_CHfont()
{
  listhead = NULL;
  gg = &listhead;
}

TPR_CHfont::~TPR_CHfont()
{
  freelist(gg);
}

void TPR_CHfont::freelist(chfont** codehead)
{
  chfont* myhead = NULL;
  if((*codehead) == NULL){
    return;  
  }
  while((*codehead)->next != NULL){
    myhead = (*codehead)->next;
    free((*codehead));
    (*codehead) = myhead;
  }
  if((*codehead) != NULL)
  {
      free((*codehead));
      (*codehead) = NULL;
  }
}

chfont* TPR_CHfont::createNew(const ChFont* mycode)
{
  chfont* newcode = (chfont*)malloc(sizeof(chfont));
  newcode->code = mycode;
  newcode->next = NULL;
  return newcode;
}

void TPR_CHfont::listAdd(chfont** codehead,const ChFont* mycode)
{
  if(codehead == NULL){
    return;  
  }
  if(*codehead == NULL){
    *codehead = createNew(mycode);
    return;
  }

  chfont* codehead2 = *codehead;
  
  while(codehead2 -> next != NULL) {
    codehead2=codehead2->next;
  }

  codehead2->next = createNew(mycode);
  return;
}


TPR_CHfont TPRFont;
