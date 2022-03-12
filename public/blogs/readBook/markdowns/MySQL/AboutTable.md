记录着MySQL中关于表的学习笔记.

## MySQL 数据类型

### 整形

|数据类型|描述|
|:-|:-|
|tinyint|1字节|
|smallint|2字节|
|mediumint|3字节|
|int|4字节|
|bigint|8字节|

可以使用 `unsigned` 来使其为非负数.

### 小数类型

|类型|描述|
|:-|:-|
|decimal(M,D)|精确类型, `M`代表最大位数(精度), `D`代表小数位位数, `M` 不可小于 `D`|
|float|单精度浮点数, 4字节|
|double|双精度浮点数, 8字节|

可以使用 `unsigned` 来使其为非负数.

### 文本型

|类型|描述|
|:-|:-|
|char(L)|指定长度文本, `L`为文本字符长度|
|varchar(L)|指定最大字符长度为`L`的文本|
|tinytext|短文本, 255字节|
|text|短文本, 65535字节|
|mediumtext|16777215字节文本|
|longtext|4294967295字节文本|

### 日期型

|类型|描述|
|:-|:-|
|date|日期类型 3字节, YYYY-MM-DD|
|time|时间类型 3字节, HH:ii:ss|
|year|年份类型 1字节, YYYY|
|datetime|日期时间混合类型 8字节, YYYY-MM-DD HH:ii:ss|
|timestamp|日期时间混合类型 8字节, 与`datetime`唯一不同是取值范围|

* 使用 `now()` 函数可以获取当前日期或者时间.
* 使用 `microsecond(now(L))` 可以获取当前时间, 可以精确到微秒 `L` 为微秒长度.

### 复合型

|类型|描述|
|:-|:-|
|enum|枚举类型|
|set|集合类型|

* `enum(Object ... objs)` 枚举类型为 `objs` 中的各个值.
* `set(Object ... objs)` `objs` 为元素包含的值, 最多为64个.

## 二进制型

|类型|描述|
|:-|:-|
|binary(n)|0~255个字节, 定长|
|varbinary|0~255个字节|
|bit|0~64个字节|
|tinyblob|0~255个字节|
|blob|65535字节|
|mediumblob|16777215字节|
|longblob|4294967295字节|

## 创建表

* `CREATE` 指令.

语法:  
`CREATE TABLE <tablename> (<filedname> <type> [约束条件], ...)[其他选项]`
* `[]` 为可选内容
* `<>` 为必选内容

### 约束条件:

|约束条件|描述|
|:-|:-|
|primary key|主键|
|default <默认值>|设定默认值|
|unique|唯一性|
|not null|非空|
|check|检查|
|foreign key|外键|
|auto_increment|自增|

#### primary key
