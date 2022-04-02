在上一个[@Controller](?blog=readBook&album=Spring&post=a-Controller)中我们知道了这是一个标记一个类是一个控制器组件.

而这个 **@RestController** 与 **@Controller** 的作用一样, 就是在 **@Controller** 的基础上添加了一个 **[@ResponseBody](?blog=readBook&album=Spring&post=a-ResponseBody)** 注解.

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Controller
@ResponseBody
public @interface RestController {

	/**
	 * The value may indicate a suggestion for a logical component name,
	 * to be turned into a Spring bean in case of an autodetected component.
	 * @return the suggested component name, if any (or empty String otherwise)
	 * @since 4.0.1
	 */
	@AliasFor(annotation = Controller.class)
	String value() default "";

}
```

根据 **[@RequestMapping](?blog=readBook&album=Spring&post=a-ResponseBody)** 在一个类上使用时的作用来看, 它能够使得这一个类中带有 **[@ResponseBody](?blog=readBook&album=Spring&post=a-RequestMapping)** 注解的方法的返回值直接加入到响应体上. 从而就不需要一个一个的去向每一个方法上添加 **[@ResponseBody](?blog=readBook&album=Spring&post=a-ResponseBody)** 注解.
