## TS练习题
### 实现Partial
**`Partial<T>`** 返回一个包含所有T的子集的 **`type`**。

请自行实现 **`MyPartial<T>`** 。
```ts
type Foo = {
  a: string
  b: number
  c: boolean
}

// below are all valid

const a: MyPartial<Foo> = {}

const b: MyPartial<Foo> = {
  a: 'BFE.dev'
}

const c: MyPartial<Foo> = {
  b: 123
}

const d: MyPartial<Foo> = {
  b: 123,
  c: true
}

const e: MyPartial<Foo> = {
  a: 'BFE.dev',
  b: 123,
  c: true
}
```
实现
```ts
type MyPartial<Foo> = {
  [k in keyof Foo]?: Foo[k]
}
```

### 实现Pick<T, K>

```ts
type Foo = {
  a: string
  b: number
  c: boolean
}

type A = MyPick<Foo, 'a' | 'b'> // {a: string, b: number}
type B = MyPick<Foo, 'c'> // {c: boolean}
type C = MyPick<Foo, 'd'> // Error
```

```ts
```
