
```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ResponseBody {

}
```

由源代码可知道, 这个注解可以用到类及方法上.

这个注解的作用是让被标记的类中的所有带有`@RequestMapping`的注解的方法或者是被标记的带有`@RequestMapping`注解的方法返回的值放入响应体中.

#### 例子1

```java
@ResponseBody
@RequestMapping("/responseBodyString")
public String responseBodyString() {
  return "Hello!";
}
```

访问 /responseBodyString 后细节如下.

```
❯ curl -v localhost:8080/demo1/responseBodyString
*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /demo1/responseBodyString HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.82.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200
< Content-Type: text/plain;charset=UTF-8
< Content-Length: 6
< Date: Thu, 31 Mar 2022 15:27:36 GMT
<
* Connection #0 to host localhost left intact
Hello!%                                      
```

#### 例子2

```java
@ResponseBody
@RequestMapping("/responseBodyVoid")
public void responseBodyVoid() {

}
```

访问过程如下

```
❯ curl -v localhost:8080/demo1/responseBodyVoid
*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /demo1/responseBodyVoid HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.82.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200
< Transfer-Encoding: chunked
< Date: Thu, 31 Mar 2022 15:49:08 GMT
<
* Connection #0 to host localhost left intact
```


#### 例子3

```java
@ResponseBody
@RequestMapping("/responseBodyObject")
public Object responseBodyObject() {
  Map<String, Object> map = new HashMap<>();
  map.put("a", 1);
  map.put("b", "bbbb");
  map.put("c", true);
  map.put("d", new HashMap<>(map));
  return map;
}
```

响应过程如下

```
❯ curl -v localhost:8080/demo1/responseBodyObject | json_pp
*   Trying 127.0.0.1:8080...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /demo1/responseBodyObject HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.82.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200
< Content-Type: application/json
< Transfer-Encoding: chunked
< Date: Thu, 31 Mar 2022 15:49:58 GMT
<
{ [65 bytes data]
100    59    0    59    0     0   9359      0 --:--:-- --:--:-- --:--:--  9833
* Connection #0 to host localhost left intact
{
   "a" : 1,
   "b" : "bbbb",
   "c" : true,
   "d" : {
      "a" : 1,
      "b" : "bbbb",
      "c" : true
   }
}
```


#### 例子4

```java
private static class Person {
  private static enum Gender {Male, Female}

  private static class Job {
    private String name;
    private double salary;

    public Job(String name, double salary) {
      this.name = name;
      this.salary = salary;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public double getSalary() {
      return salary;
    }

    public void setSalary(double salary) {
      this.salary = salary;
    }
  }

  private Integer id;
  private String firstName;
  private String lastName;
  private Gender gender;
  private Boolean married;
  private Job job;

  public Person(Integer id, String firstName, String lastName, Gender gender, Boolean married, Job job) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.married = married;
    this.job = job;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public Gender getGender() {
    return gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public Boolean getMarried() {
    return married;
  }

  public void setMarried(Boolean married) {
    this.married = married;
  }

  public void setJob(Job job) {
    this.job = job;
  }

  public Job getJob() {
    return job;
  }

  public String getName() {
    return firstName + " " + lastName;
  }

  public void setName(String name) {
    String[] names = name.split(" ");
    firstName = names[0];
    lastName  = names[1];
  }
}

@ResponseBody
@RequestMapping("/responseBodyObject2")
public Object responseBodyObject2() {
  Person person = new Person(
          165,
          "Smile",
          "Yik",
          Person.Gender.Male,
          false,
          new Person.Job("Cleaner", 16.5)
  );
  return person;
}
```

响应过程如下

```
❯ curl -v localhost:8080/demo1/responseBodyObject2 | json_pp
*   Trying 127.0.0.1:8080...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /demo1/responseBodyObject2 HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.82.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200
< Content-Type: application/json
< Transfer-Encoding: chunked
< Date: Thu, 31 Mar 2022 15:50:54 GMT
<
{ [143 bytes data]
100   137    0   137    0     0  20992      0 --:--:-- --:--:-- --:--:-- 22833
* Connection #0 to host localhost left intact
{
   "firstName" : "Smile",
   "gender" : "Male",
   "id" : 165,
   "job" : {
      "name" : "Cleaner",
      "salary" : 16.5
   },
   "lastName" : "Yik",
   "married" : false,
   "name" : "Smile Yik"
}

```
