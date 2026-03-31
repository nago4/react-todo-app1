export type Todo = {//typeは型エイリアスと呼ばれる機能で、オブジェクトの構造を定義するために使用されます。
    id: string;
    name: string;
    isDone: boolean;
    priority: number;
    deadline: Date | null; // 注意
};