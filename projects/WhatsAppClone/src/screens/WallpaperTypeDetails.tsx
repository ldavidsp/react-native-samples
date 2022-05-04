import React from 'react'
import {Image, Pressable, SafeAreaView, StyleSheet, View} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {colors} from '../theme'
import {flex, sizes} from '../global'
import {BackgroundTypes, StackNavigatorParamList} from '../types'
import {RouteProp} from '@react-navigation/native'
import Header from '../components/Header'
import {get} from 'lodash'
import useChannelPreferences from '../hooks/useChannelPreferences'
import PeekabooView from '../components/PeekabooView'

export type CustomWallPaperScreenNavigationProp = StackNavigationProp<
  StackNavigatorParamList,
  'WallpaperTypeDetails'
>
export type CustomWallPaperRouteProp = RouteProp<
  StackNavigatorParamList,
  'WallpaperTypeDetails'
>

export type Props = {
  navigation: CustomWallPaperScreenNavigationProp
  route: CustomWallPaperRouteProp
}

const GRID_ITEM_WIDTH = '32.7%'
const SOLID_COLORS = [
  [49, 113, 116],
  [52, 103, 82],
  [38, 90, 65],
  [50, 82, 128],
  [32, 94, 97],
  [31, 82, 94],
  [42, 33, 98],
  [81, 81, 81],
  [89, 100, 61],
  [120, 110, 44],
  [94, 79, 7],
  [154, 91, 7],
].map(backgroundColor => ({backgroundColor}))
const BRIGHT_IMAGES = [
  'https://images.unsplash.com/photo-1549125764-91425ca48850?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NjF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1549241520-425e3dfc01cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8ODB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1554226321-24fdcddd5a55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjE5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1550006490-9f0656b79e9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8ODl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1551506448-074afa034c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1553114835-6f7674d3c2c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTMyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1553075712-453f7213c24f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTMzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1551917951-148edcd8ea8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTU3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1553969923-bbf0cac2666b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjA3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1553194642-29b272a173b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTcwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTcxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1553526777-5ffa3b3248d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTk4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
].map(imageUri => ({
  imageUri,
}))
const DARK_IMAGES = [
  'https://images.unsplash.com/photo-1546788774-2bb47f590283?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  'https://images.unsplash.com/photo-1547157720-52d782e55b83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1546839535-2e8e927fb5ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1547534887-8d299f2c126b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1547499417-61a435d27cb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1547922374-968968e3f658?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1548413935-a7d015ff5865?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NTN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1553763502-c4aca528d672?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTczfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1553414701-7e7de9266721?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTc3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1554876269-3045eeb59550?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTg2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
].map(imageUri => ({imageUri}))

export type BackgroundItem = {
  imageUri?: string
  backgroundColor?: number[] | undefined
}
const typeToWallpaperItemLookUp: Record<BackgroundTypes, BackgroundItem[]> = {
  [BackgroundTypes.solidColors]: SOLID_COLORS,
  [BackgroundTypes.dark]: DARK_IMAGES,
  [BackgroundTypes.bright]: BRIGHT_IMAGES,
}

export default ({
  navigation: {navigate},
  route: {
    params: {type, channelId},
  },
}: Props) => {
  const {setPreferences} = useChannelPreferences(channelId)
  const wallpaperItems = get(typeToWallpaperItemLookUp, type)
  return (
    <>
      <Header title={type} />
      <SafeAreaView
        style={{
          ...flex.contentCenter1,
          backgroundColor: colors.dark.background,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'stretch',
            flexWrap: 'wrap',
            flex: 1,
            padding: sizes.sm,
          }}>
          {wallpaperItems?.map(({backgroundColor, imageUri = ''}, i) => {
            const handleOnPress = () => {
              setPreferences({backgroundColor, imageUri})
              navigate('CustomWallpaper', {channelId})
            }

            const r = get(backgroundColor, 0)
            const g = get(backgroundColor, 1)
            const b = get(backgroundColor, 2)

            return (
              <Pressable
                key={i}
                onPress={handleOnPress}
                style={{
                  backgroundColor: `rgba(${r},${g},${b}, 1)`,
                  margin: sizes.xxs,
                  width: GRID_ITEM_WIDTH,
                }}>
                <PeekabooView isEnabled={!!imageUri}>
                  <Image
                    style={{
                      flex: 1,
                      width: '100%',
                    }}
                    source={{uri: imageUri}}
                  />
                </PeekabooView>
              </Pressable>
            )
          })}
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({})
