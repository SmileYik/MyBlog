
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Controller {

	/**
	 * The value may indicate a suggestion for a logical component name,
	 * to be turned into a Spring bean in case of an autodetected component.
	 * @return the suggested component name, if any (or empty String otherwise)
	 */
	@AliasFor(annotation = Component.class)
	String value() default "";

}
```

此注解只能用在类上, 与此同时, @Controller 也是一个特殊 @Component.

此注解用来标记一个类是一个控制器, 通常于`@RequestMapping`一起使用.

#### value 属性

这个属性是 @Component 注解的value属性的别名, 实际上是给组件bean取个名字.
