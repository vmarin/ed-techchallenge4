import { FlatList } from "react-native";
import Post from "./post";

export type PostsProps = {
  id: string
  title: string
  description: string
  author: string
  createdAt: string
  modifiedAt: string
}

type Props = {
  data: PostsProps[]
}
export default function Posts({ data }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) =>
        <Post
          id={item.id}
          title={item.title}
          description={item.description}
          author={item.author}
          createdAt={item.createdAt}
        />
      }
    />
  )
}