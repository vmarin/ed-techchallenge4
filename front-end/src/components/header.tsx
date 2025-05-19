import Icon from "@/assets/icons";
import { router, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BackButton from "./backButton";
import { useAuth } from "@/contexts/authContext";

type HeaderProps = {
  title?: string
  showBackButton?: boolean
  headerRight?: React.ReactNode;
}
export default function Header({ title, showBackButton = false, headerRight }: HeaderProps) {
  const { user, signOut } = useAuth();
  const segments = useSegments()
  const currentRoute = segments[1]

  function handleSignout() {
    signOut()
  }


  return (
    currentRoute !== undefined ?
      <View style={s.container}>
        {
          showBackButton && (
            <View style={s.BackButton}>
              <BackButton />
            </View>
          )
        }
        <Text style={s.title}>{title || ""}</Text>
        {user && user.role !== 'student' && headerRight && <View style={s.right}>{headerRight}</View>}
      </View>
      :
      <View>
        <View style={s.header}>
          <Text style={s.title}>Escola Desafio</Text>
          <View style={s.icons}>
            {user && user.role !== 'student' && (
              <>
                <Pressable onPress={() => router.push('/newPost')}>
                  <Icon name="plus" />
                </Pressable>

                <Pressable onPress={() => router.push('/userList')}>
                  <Icon name="userIcon" />
                </Pressable>
              </>
            )}

            {user ? (
              <Pressable onPress={handleSignout}>
                <Icon name="logoutIcon" />
              </Pressable>
            ) : (
              <Pressable onPress={() => router.push('/(auth)/login')}>
                <Icon name="loginIcon" />
              </Pressable>
            )}

          </View>
        </View>
      </View>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    gap: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 8
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: "700"
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18
  },
  BackButton: {
    position: 'absolute',
    left: 0
  },
  right: {
    position: 'absolute',
    right: 0,
  }
})