# DIY Item (对应RealSurvival版本: 0.4.0)  

> 目录
> * [1. Lore自定义物品篇](#Lore自定义物品篇)
>   * [1.1 准备工作](#准备工作)
>   * [1.2 sleep标签](#sleep标签)
>   * [1.3 thirst | hunger | energy | health 标签](#thirst--hunger--energy--health-标签)
>   * [1.4 weight 标签](#weight-标签)
>   * [1.5 temperature标签](#temperature标签)
>   * [1.6 drug 标签](#drug-标签)
>   * [1.7 disease-source 标签](#disease-source-标签)
> * [2. NBTItem 自定义物品篇](#NBTItem-自定义物品篇)
>   * [2.1 准备工作](#准备工作-1)
>   * [2.2 与sleep属性有关的NBIItem配置](#与sleep属性有关的NBIItem配置)
>   * [2.3 与 thirst | energy | hunger | health 属性有关的NBTItem配置](#与-thirst--energy--hunger--health-属性有关的NBTItem配置)
>   * [2.4 与weight属性有关的配置](#与weight属性有关的配置)
>   * [2.5 与temperature属性有关的配置](#与temperature属性有关的配置)
>   * [2.6 与疾病有关的属性](#与疾病有关的属性)
>   * [2.7 写完配置文件后的操作](#写完配置文件后的操作)

在开始之前,你必须了解一些自定义物品的指令,使用如下指令即可查看与自定义物品有关的指令的帮助.  
 **`/rsi help`**  
  
## Lore自定义物品篇
  
### 准备工作  

打开config.yml,找到如下一段  
根据个人喜好,对labels下":"号与末尾"""号之间文本进行修改

    label:
      split: ":"
      labels:
        - "sleep:Sleep"              #精力
        - "thirst:Thirst"            #水分
        - "weight:Weight"            #负重
        - "hunger:Hunger"            #饥饿值
        - "energy:Energy"            #体力
        - "health:Health"            #生命值
        - "drug:Drug"                #药物
        - "temperature:Temperature"  #温度
  
随意修改后(并用以下修改后的数据对各个标签进行讲解):
  
    label:
      split: ":"
      labels:
        - "sleep:精力"              #精力
        - "thirst:水分"            #水分
        - "weight:质量"            #负重
        - "hunger:饥饿"            #饥饿值
        - "energy:体力"            #体力
        - "health:生命"            #生命值
        - "drug:药物"                #药物
        - "temperature:温度耐受"  #温度
  
  **注: 以下将用[]符号扩住变量类的值**

### sleep标签
  
此标签能影响Sleep属性值, 对应lore格式如下:  
  
 * **`[sleep标签]: [数值]`**   玩家对应属性简单加合所对应数值,数值可以为负数
 * **`[sleep标签]: [数值]%`**  玩家对应属性简单加合 **玩家对应属性总值x数值/100** 所得到的值, 同理可为负数
 * **`[sleep标签]: [数值1]/[数值2]`**  与第一个格式效果相同,但对应增加数值为数值1与数值2之间的任意一个数
 * **`[sleep标签]: [数值1]%/[数值2]%`**  与第三个格式效果相同,但对应增加数值为 **数值1与数值2之间的任意一个数x数值/100**
  
指令梨子:  
 * **`/rsi lore add1 精力: 10`**  使手上物品使用后增加10点Sleep属性的效果
 * **`/rsi lore add1 精力: 10%`**  使手上物品使用后增加属性最大值的10%点Sleep属性的效果
 * **`/rsi lore add1 精力: 10%/20%`**  使手上物品使用后增加属性最大值的10%-20%点Sleep属性的效果
  
### thirst | hunger | energy | health 标签
  
皆同理sleep
  
### weight 标签
  
能给物品定义质量, 对应lore格式如下:  
  
 * **`[weight标签]: [数值]`** 给物品定义相应数值的质量
  
指令梨子:  
 * **`/rsi lore add1 质量: 1kg`**  使手上物品质量设定为1
 * **`/rsi lore add1 质量: 1千克`**  使手上物品质量设定为1
 * **`/rsi lore add1 质量: 1`**  使手上物品质量设定为1
  
### temperature标签  
  
此标签仅在装备槽有效,能对玩家的温度耐受值进行修改  
  
对应lore格式:  
  
* **`[temperature标签]: [数值1]/[数值2]`** 玩家低温耐受值简单加合数值1,玩家高温耐受值简单加合数值2, 数值1/2皆可为0
  
指令黎子(设默认最低温耐受值为20℃,最高温耐受值为30℃):  
 * **`/rsi lore add1 温度耐受: -10/1`** 使手中物品装备上后,最低温耐受值增加-10℃(即10℃),最高温耐受值增加1摄氏度(即31℃)
  
### drug 标签
  
对应lore格式:
  
* **`[drug标签]: [NBTItem物品名]`**
  
NBTItem物品名请参阅 **`NBTItem 自定义物品篇`**
  
**注: NBTItem物品名不允许出现空格
  
### disease-source 标签
  
用法同drug标签, 作用为用带有此lore的物品攻击他人时, 他人能有几率致病, 且只能致病不能治病
  
## NBTItem 自定义物品篇
  
### 准备工作
  
以压缩包的方式打开本插件的.jar文件,将`NBTItem.yml`文件打开并复制到插件目录下的`nbtitem`目录下或在`nbtitem`目录下创建一个新的`.yml`文件.  
你需要了解基本的配置:  
  
        #增加(或减少)精力值
        sleep: -10/10
        #是否为比例值(下同)
        sleep-max: true
        #增加(或减少)水分值
        thirst: -10/10
        thirst-max: true
        #增加(或减少)体力值
        energy: -10/10
        energy-max: false
        #增加(或减少)饥饿值
        hunger: -10/10
        hunger-max: true
        #增加(或减少)生命值
        health: -10/10
        health-max: false
        #温度容忍值改变,
        #左边改变最低容忍值,
        #右边改变最高容忍值
        #与默认容忍值简单加合
        temperature: -10/10
        #物品重量
        weight: 1
        #致病,
        #病名:致病几率(1-100)
        disease:
          - "disease1:10"
          - "disease2:12"
        #能够治愈的病
        #病名,药效最小值/药效最大值,持续时间最小值/持续时间最大值
        enable-disease:
          - "disease3,3/5,10/20"
          - "disease4,3/5,10/20"
        #对某些病有副作用
        wrong-disease:
          - "disease3"
          - "disease4"
        #详细副作用
        eat-wrong-drug:
          - "effect1"
          - "effect2"
        #对没病的人造成的作用
        no-need-drug:
          - "effect3"
          - "effect4"
        #大致与minecraft-item.yml中的设定相同
  
这些配置,若不需要,则可以直接删除.  
例子(仅需要一个物品能加精力值及水分值的对应配置文件):  
  
        #增加(或减少)精力值
        sleep: 10/20
        #增加(或减少)水分值
        thirst: 5/10
        thirst-max: false
  
了解后进入正题.
  
### 与**sleep属性**有关的NBIItem配置  
  
 * **`sleep: [数值1]/[数值2]`**  数值1与数值2直接任意数充当**比例值**或者**直接为属性值**对sleep属性值产生影响
 * **`sleep-max: [true|false]`**  决定上一条配置是**比例值**还是**直接为属性值** 设定为true为比例值,设定为false为直接为属性值
  
### 与 **thirst** | **energy** | **hunger** | **health** 属性有关的NBTItem配置
  
相似于sleep属性
  
### 与**weight属性**有关的配置
  
* **`weight: [数值]`** 设定物品的质量
  
### 与**temperature属性**有关的配置  
  
* **`temperature: [数值1]/[数值2]`** 与lore中temperature标签相似,数值1修改最低温度耐受值,数值2修改最大温度耐受值
  
### 与**疾病**有关的属性
  
 * 致病, 使玩家生病
  
        #致病,
        #病名:致病几率(1-100)
        #病名为在config.yml中设定的病名
        #数值为0-100的数值,数值越高,致病几率越大
        #可根据需求增加
        disease:
          - "[病名1]:[数值1]"
          - "[病名n]:[数值n]"
  
 * 治病, 使玩家远离生病
  
        #能够治愈的病
        #病名,药效最小值/药效最大值,持续时间最小值/持续时间最大值
        #病名为在config.yml设置的疾病名称
        #数值1/数值n 为药效最小值, 数值2/数值n+1 为药效最大值
        #数值3/数值n+2 为药效持续时间最小值(正整数), 数值4/数值n+3 为药效持续时间最大值(正整数)
        enable-disease:
          - "[病名1],[数值1]/[数值2],[数值3]/[数值4]"
          - "[病名n],数值[n]/[数值n+1],[数值n+2]/[数值n+3]"
  
 * 对某些病有副作用, 仅在治病有效时(能够治疗某些病)有效, 并且以下两个配置**必须**同时存在
  
        #对某些病有副作用
        wrong-disease:
          - "[病名1]"
          - "[病名n]"
        #详细副作用
        eat-wrong-drug:
          - "[效果名1],[效果持续时间1(整数)],[效果强度1(整数)]"
          - "[效果名n],[效果持续时间n(整数)],[效果强度n(整数)]"
  
 * 对正常(未生病)的玩家有负效果, 仅在治病有效时(能够治疗某些病)有效
  
        #对没病的人造成的作用
        no-need-drug:
          - "[效果名1],[效果持续时间1(整数)],[效果强度1(整数)]"
          - "[效果名n],[效果持续时间n(整数)],[效果强度n(整数)]"
  
### 写完配置文件后的操作
  
 * 获取有效配置文件对应的NBTItem物品名
 > * 当配置文件在`nbtitem`目录下**的目录中**  
 > > 假设配置文件名叫 **`测试物品.yml`** , 在 **`/RealSurvival/nbtitem/测试物品/`** 目录下,及文件路径为 **`/RealSurvival/nbtitem/测试物品/测试物品.yml`** 对应的NBTItem物品名为文件路径的 **`nbtitem/`** 字符后面, **`.yml`** 字符前面部分,即为 **`测试物品/测试物品`** , 同理,文件路径为 **`/RealSurvival/nbtitem/药物/青霉素类/头孢.yml`** 的配置文件对应的NBTItem物品名为 **`药物/青霉素类/头孢`**
 > * 当配置文件直接在`nbtitem`目录下
 > > 若配置文件直接在`nbtitem`目录下, 对应NBTItem物品名为 文件名去除`.yml`后的文本.  例如在`nbtitem`目录下有个 **`苹果.yml`** 配置文件, 对应的NBTItem物品名为 **`苹果`** 
 * 使用 **`/rsi setNBTItem [NBTItem物品名]`** 设定NBTItem
 > 假设我写的NBTItem配置文件路径为 **`/RealSurvival/nbtitem/食物/煎鸡蛋.yml`** 则对应的NBTItem物品名为 **`食物/煎鸡蛋`** , 在游戏中, 手持一个物品,输入指令 **`/rsi setNBTItem 食物/煎鸡蛋`** 后,使用手中物品就能让对应配置文件中配置生效.
  
```    
public static void main() {
}
```
