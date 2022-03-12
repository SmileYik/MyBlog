## KMP伪代码

```
KMP-MATCHER(T, P)
  n = T.length
  m = P.length
  pi = COMPUTE-PREFIX-FUNCTION(P)
  q = 0
  for i = 1 to n
    while q > 0 and T[i] != P[q + 1]
      q = pi[q]
    if T[i] == P[q + 1]
      q = q + 1
    if q == m
      print "Patten occurs with shift" i-m
      q = pi[q]

COMPUTE-PREFIX-FUNCTION(P)
  m = P.length
  let pi[1..m] be a new array
  pi[1] = 0
  k = 0
  for i = 1 to m
    while k > 0 and P[i] != P[k + 1]
      k = pi[k]
    if P[i] == P[k + 1]
      k = k + 1
    pi[i] = k
  return pi
```

## java代码实现

```java
public static void kmpMatcher(String t, String p) {
  int[] pi = computePrefixFunction(p);
  char[] tChars = t.toCharArray();
  char[] pChars = p.toCharArray();
  int k = 0;
  for (int i = 0; i < t.length(); ++i) {
    while (k > 0 && pChars[k] != tChars[i]) {
      k = pi[k];
    }
    if (pChars[k] == tChars[i]) {
      ++k;
    }
    if (k == p.length()) {
      System.out.println("Pattern occurs with shift " + (i - p.length()));
      k = pi[k - 1];
    }
  }
}


public static int[] computePrefixFunction(String p) {
  int[] pi = new int[p.length()];
  char[] chars = p.toCharArray();
  pi[0] = 0;
  int k = 0;
  for (int i = 1; i < pi.length; ++i) {
    while (k > 0 && chars[k] != chars[i]) {
      k = pi[k];
    }
    if (chars[k] == chars[i]) {
      ++k;
    }
    pi[i] = k;
  }
  return pi;
}
```
