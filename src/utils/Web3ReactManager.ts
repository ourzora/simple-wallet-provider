/*
 * Thanks Uniswap ❤️🦄
 * https://github.com/Uniswap/uniswap-interface/blob/main/src/components/Web3ReactManager/index.tsx
 */

import { useEagerConnect } from '../hooks/useEagerConnect'
import { useInactiveListener } from '../hooks/useInactiveListener'

const Web3ReactManager = ({ children }: { children: JSX.Element }) => {
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager)
  return children
}

export default Web3ReactManager
