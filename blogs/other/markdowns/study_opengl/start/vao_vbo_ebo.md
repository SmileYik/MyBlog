### Vertex Buffer Object

**Vertex Buffer Object**(VBO): 顶点缓冲对象

顶点缓冲对象是来存储要绘制的图形所需要的顶点. 基本用法为先创建一个缓冲A(`glGenBuffers()`), 然后将缓冲A绑定(`glBindBuffer()`)在顶点缓冲类型目标(`GL_ARRAY_BUFFER`)上, 之后再将顶点数据传递给(`glBufferData()`)顶点缓冲类型. 代码实现大概为以下几个步骤:

```cpp
// 准备好的顶点数据.
GLfloat vertices[] = { ... };

// 创建缓冲对象, 获取缓冲对象id.
GLuint vboId;
glGenBuffers(1, &vboId);

// 将缓冲对象绑定在顶点缓冲类型上
glBindBuffer(GL_ARRAY_BUFFER, VBO);

// 将顶点数据传递给顶点缓冲类型
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
```

使用顶点缓冲对象直接绘制图形可以使用如下代码:

```cpp
glDrawArrays(GL_TRIANGLES, 0, 6);
```
其参数依次为: 

+ 绘制的图案类型
+ 绘制图案时, 起始的顶点索引
+ 绘制多少个顶点

### Element Buffer Object

**Element Buffer Object**(EBO): 元素缓冲对象

元素缓冲对象可以将一些不重复的点的下标进行分组, 之后根据每组的顶点去绘制图形以达到相同的点复用的效果. 

元素缓冲对象的具体创建方法与顶点缓冲对象相类似, 先创建一个缓冲对象(`glGenBuffer()`)A, 然后把缓冲对象绑定(`glBindBuffer()`)到元素缓冲类型(`GL_ELEMENT_ARRAY_BUFFER`)上, 之后再把顶点索引数组传递给元素缓冲类型中.具体代码看起来像是这个样子的:

```cpp
// 顶点索引
GLuint indices[] = { ... };

// 创建缓冲对象
GLuint eboId;
glGenBuffer(1, &eboId);

// 绑定缓冲对象到元素数组缓冲类型上
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, eboid);

// 传递顶点索引给元素数组缓冲类型上
glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);
```

使用元素缓冲对象绘制图形时不应该使用`glDrawArrays()`方法, 应该使用如下方法: 
```cpp
glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);
```
所使用的参数依次为:
+ 绘制图案类型
+ 绘制顶点个数
+ 顶点索引类型
+ 偏移量

### Vertex Array Object

**Vertex Array Object**(VAO): 顶点数组对象.

顶点数组对象可以方便的读取VBO及EBO所绑定的属性配置, 达到绑定好后快速切换配置的目的.

使用方法大致为创建一个顶点数组对象(`glGenVertexArrays()`), 之后绑定这个顶点数组对象(`glBindVertexArray()`), 然后对VBO及EBO的属性进行配置, 配置完后对顶点数组对象进行解绑(`glBindVertexArray()`); 随后需要使用时再次绑定即可继续使用.

![VAO](https://learnopengl-cn.github.io/img/01/04/vertex_array_objects_ebo.png) 
(此图来自LearnOpenGL CN)

### 学习时编写的代码

```cpp
#include <iostream>
#include <glad/glad.h>
#include <GLFW/glfw3.h>

#define WIDTH  800
#define HEIGHT 800
#define TITLE  "Hello Triangle!"

#define VERTEX_SHADER_SOURCE "#version 330 core\nlayout\n(location = 0) in vec3 aPos;\nvoid main() {\n  gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\n}"

#define FRAGMENT_SHADER_SOURCE "#version 330 core\nout vec4 FragColor;\nvoid main() {\n  FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);\n}"

using namespace std;

GLfloat vertices[] = {
  -0.5f, -0.5f, 0.0f, // 左下角
  -0.5f,  0.5f, 0.0f, // 左上角
   0.5f, -0.5f, 0.0f, // 右下角
// 0.5f, -0.5f, 0.0f, // 右下角
   0.5f,  0.5f, 0.0f, // 右上角
//-0.5f,  0.5f, 0.0f  // 左上角
};

GLuint indices[] = {
  0, 1, 2, // first triangle
  2, 3, 1  // second triangle
};

void proceeInput(GLFWwindow* window)
{
  if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
  {
    glfwSetWindowShouldClose(window, GLFW_TRUE);
  }
}

void framebuffer_change_callback(GLFWwindow* window, int width, int height)
{
    glViewport(0, 0, width, height);
}

int main()
{
  if (glfwInit() == GLFW_FALSE)
  {
    cerr << "Initilization GLFW failed!" << endl;
    return -1;
  }
  glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, GLFW_VERSION_MAJOR);
  glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, GLFW_VERSION_MINOR);
  glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

  GLFWwindow* window = glfwCreateWindow(WIDTH, HEIGHT, TITLE, NULL, NULL);
  if (window == NULL)
  {
    cerr << "Create GLFW window failed!" << endl;
    glfwTerminate();
    return -1;
  }
  glfwMakeContextCurrent(window);

  if (!gladLoadGLLoader((GLADloadproc) glfwGetProcAddress))
  {
    cerr << "Initilization glad failed!" << endl;
    glfwTerminate();
    return -1;
  }

  glViewport(0, 0, WIDTH, HEIGHT);
  glfwSetFramebufferSizeCallback(window, framebuffer_change_callback);

  // do something
  GLuint VAO;
  glGenVertexArrays(1, &VAO);
  glBindVertexArray(VAO);

  unsigned int VBO;
  glGenBuffers(1, &VBO);
  glBindBuffer(GL_ARRAY_BUFFER, VBO);
  glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

  GLuint EBO;
  glGenBuffers(1, &EBO);
  glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
  glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);

  // compile vertex shader
  GLuint vertexShaderId = glCreateShader(GL_VERTEX_SHADER);
  string vertexShaderSource = VERTEX_SHADER_SOURCE;
  const char* vertexShaderSourcePtr = vertexShaderSource.c_str();
  glShaderSource(vertexShaderId, 1, &vertexShaderSourcePtr, NULL);
  glCompileShader(vertexShaderId);

  // check compiled success or not
  {
    int success;
    char infoLog[512];
    glGetShaderiv(vertexShaderId, GL_COMPILE_STATUS, &success);
    if (!success) {
      glGetShaderInfoLog(vertexShaderId, 512, NULL, infoLog);
      cerr << "Compile vertex shader failed: " << infoLog << endl;
    }
  }

  GLuint fragmentShaderId = glCreateShader(GL_FRAGMENT_SHADER);
  string fragmentShaderSource = FRAGMENT_SHADER_SOURCE;
  const char* fragmentShaderSourcePtr = fragmentShaderSource.c_str();
  glShaderSource(fragmentShaderId, 1, &fragmentShaderSourcePtr, NULL);
  glCompileShader(fragmentShaderId);

  {
    int success;
    char infoLog[512];
    glGetShaderiv(fragmentShaderId, GL_COMPILE_STATUS, &success);
    if (!success) {
      glGetShaderInfoLog(fragmentShaderId, 512, NULL, infoLog);
      cerr << "Compile fragment shader failed: " << infoLog << endl;
    }
  }

  GLuint programId = glCreateProgram();
  glAttachShader(programId, vertexShaderId);
  glAttachShader(programId, fragmentShaderId);
  glLinkProgram(programId);

  {
    int success;
    char infoLog[512];
    glGetProgramiv(programId, GL_LINK_STATUS, &success);
    if (!success) {
      glGetProgramInfoLog(programId, 512, NULL, infoLog);
      cerr << "Linking program failed: " << infoLog << endl;
    }
  }

  glUseProgram(programId);

  glDeleteShader(vertexShaderId);
  glDeleteShader(fragmentShaderId);

  glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(GLfloat), (void*) 0);
  glEnableVertexAttribArray(0);


  while (!glfwWindowShouldClose(window))
  {
    glClearColor(0.2f, 0.4f, 0.4f, 0.8f);
    glClear(GL_COLOR_BUFFER_BIT);

    proceeInput(window);

    // draw something....
    glUseProgram(programId);
    glBindVertexArray(VAO);
    // glDrawArrays(GL_TRIANGLES, 0, 6);
    glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);
    // 解绑VAO.
    glBindVertexArray(0);


    glfwSwapBuffers(window);
    glfwPollEvents();
  }


  glfwTerminate();
  return 0;
}
```


