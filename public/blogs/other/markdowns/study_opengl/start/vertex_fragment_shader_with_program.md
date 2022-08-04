### 着色器

#### 顶点着色器

顶点着色器需要使用着色器语言编写并且在程序运行时候编译.

简单的顶点着色器代码可以是如下

```glsl
#version 330 core

layout (location = 0) in vec3 aPos;

void main() {
  gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);
}
```

编译过程需要先创建一个顶点着色器, 然后将着色器的源码附加在着色器对象上, 最后对它进行编译. 具体代码实现类似于下面所示:

```c++
// 准备好的顶点着色器源码
const char* vertexShaderSource = ..... ;

// 创建一个顶点着色器
GLuint vertexShader = glCreateShader(GL_VERTEX_SHADER);

// 将着色器源码与这个顶点着色器对象进行绑定
glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);

// 编译着色器
glCompileShader(vertexShader);
```

#### 片段着色器

片段着色器的作用是计算像素最后的颜色输出, 他和顶点着色器一样也是使用着色器语言进行编写并且需要在程序运行时进行编译.

一个简单的片段着色器可以如下所示:

```glsl
#version 330 core
out vec4 FragColor;

void main() {
  FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);
}
```

在程序中使用也与顶点着色器相似, 具体如下:

```c++
// 准备好的片段着色器源码
const char* fragmentShaderSource = ..... ;

// 创建一个片段着色器
GLuint fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);

// 将着色器源码与这个片段着色器对象进行绑定
glShaderSource(fragmentShader, 1, &fragmentShaderSource, NULL);

// 编译着色器
glCompileShader(fragmentShader);
```

#### 编译着色器产生的错误信息

如果着色器代码在编译过程中产生了错误, 我们没有主动去获取这个日志, 那么就不会输出哪里错了, 一般来说为了让我们更好的知道哪里有错误我们可以使用如下代码去检测着色器是否编译成功

```c++
GLint success;
char infoLog[512];
// 获取着色器编译状态, 并将此状态保存到success变量中.
glGetShaderiv(shader, GL_COMPILE_STATUS, &success);
if (!success) {
  // 获取着色器信息日志
  glGetShaderInfoLog(shader, 512, NULL, infoLog);
  cerr << "shader compile failed: " << infoLog << endl;
}
```

### 着色器程序

#### 链接着色器程序

编译完着色器后可以将着色器链接到着色器程序上. 具体方式为创建一个着色器程序对象, 然后将着色器绑定在着色器程序上, 然后对着色器程序进行链接操作.

```c++
// 创建一个着色器程序对象.
GLuint program = glCreateProgram();
// 绑定着色器
glAttachShader(program, vertexShader);
glAttachShader(program, fragmentShader);
// 开始链接
glLinkProgram(program);
```

#### 获取链接信息

和获取着色器产生的错误信息类似, 具体代码如下:

```c++
int success;
char infoLog[512];
// 获取着色器程序链接状态, 并将状态赋值至success变量中.
glGetProgramiv(program, GL_LINK_STATUS, &success);
if (!success) {
  // 获取着色器程序日志信息. 
  glGetProgramInfoLog(program, 512, NULL, infoLog);
  cerr << "Program linked failed: " << infoLog << endl;
}
```