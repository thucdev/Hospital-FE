listJob ?? [] =>> 2 dấu chấm hỏi là undefind hoặc null thì lấy mảng rỗng

UseState
dùng để set state, render lại theo dữ liệu state mới

## cách dùng

import { useState } from react

function Component() {
const [state, setState] = useState(initState)

    ...

}

#Lưu ý - Component được re - render sau khi setState - initial state chỉ dùng cho lần đầu render - Set state với callback - initial State với callback => sẽ không dùng hàm làm initial state mà sẽ lấy giá trị return của hàm làm initial state - set State là thay thế state bằng giá trị mới

# ràng buộc 2 chiều. two-way binding

1 chiều là chiều tương tác trên giao diện:

-   khi sửa input ở giao diện mà state thay đổi

2 là chiều dữ liệu

-   thay đổi state ở code và giao diện thay đổi theo

#################

# useEffect

callback luôn được gọi sau khi component mounted

1. useEffect(callback) => hầu như không dùng vì render quá nhiều

-   Gọi callback mỗi khi component re-render
-   gọi callback khi component thêm element vào DOM

2. useEffect(callback, []) => chỉ render lần đầu tiên, thường gọi API...

-   chỉ gọi callback 1 lấn sau khi component mount

3. useEffect(callback, [deps])
   deps có thể được coi là biến chứa giá trị

-   khi deps thay đổi thì callback mới được gọi

-   cleanup function luôn được gọi trước khi component unmounted
-   cleanup function luôn được gọi trước khi callback được gọi (trừ lần mounted)

-   cleanup function là hàm return trong callback cua useEffect

4. useLayoutEffect
   Giống hệt useEffect nhưng render UI cuối cùng

# So sánh:

UseEffect : nên dùng

-   Cập nhật lại state
-   Cập nhật lại DOM (mutated)
-   Render lại UI
-   gọi cleanup nếu deps thay đổi
-   gọi useEffect callback

UseLayoutEffect: chỉ dùng khi gặp sự cố tự render lại chính nó

-   Cập nhật lại state
-   Cập nhật lại DOM (mutated)
-   gọi cleanup nếu deps thay đổi (sync)
-   gọi useLayoutEffect callback (sync)
-   Render lại UI

5. UseRef:

-   Lưu các giá trị của biến qua một tham chiếu bên ngoài
-   luôn trả về một object
-   thường để lấy giá trị hiện tại và giá trị trước đó của state

6. memo

-   HOC: higher order component
-   dùng để tránh việc render component không cần thiết. dùng để bọc coponent
-   props thay đổi thì mới render

7. useCallback(callback, [] or [deps])

-   hoạt động giống useEffect
-   dùng với React memo, refernce type
-   nếu component con đã sử dụng memo để tránh render không cần thiết thì phải dùng useCallback
    ở tất cả các function truyền props vào.

8. useMemo(callback, [] or [deps])

-   hoạt động giống useEffect

-   Tên giống memo nhưng không phải, đây là một hooks

-   Dùng để tránh thực hiện lại một logic nào đó không cần thiết

9. useReducer. hoạt động tương tự redux

-   cung cấp thêm lựa chọn để sử dụng state trong function component
-   khi state phức tạp không thể sử dụng useState

// useState

-   1. initstate
-   2. Action

// useReducer

-   1. initstate
-   2. Action
-   3. Reducer
-   4. dispatch

10. useContext

1. createContex => ở component cha bọc ngoài
1. Provider
1. Comsumer => dùng ở component con muốn nhận dữ liệu
   gọi useContext ở component muốn nhận dữ liệu

-   Sử dụng để làm store chung giống redux, nhưng chưa tối ưu bằng vì
    . Hiệu năng không bằng redux vì ôm children nên phải render lại
    . redux hỗ trợ đa nền tảng và chỉ render component nào thay đổi
    . redux dễ debug hơn
    . redux có thể thêm middleware vào

11. useImperativeHandle

-   hooks này dùng để tuỳ chỉnh được ref của function component
-   để mang lại tính đóng gói, private, không mang dữ liệu không cần thiết ra bên ngoài component khác

Lưu ý: function component không thể truyền ref xuống cho component con được

-   phải dùng forwardRef (HOC) để bọc lại ở component muốn nhận ref. Sẽ trả lại ref qua đối số thứ 2 của coponent muốn nhận ref
