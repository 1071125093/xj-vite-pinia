declare namespace Shard43 {
  type  ListItem =  {
    type: 'happy'
    label: string
    value: number
  }
  interface DetailItem {
    type: 'sad'
    id: number
    title: string
  }
}
