import  { Configuration, OpenAIApi } from "openai"
import trimNewlines from 'trim-newlines'

export default async function askDavinci(prompt, opts) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const openai = new OpenAIApi(configuration)

  let cfg = {
    model: "text-davinci-003",
    temperature: 0,
    prompt,
    max_tokens: 3500-Math.round(prompt.length/4),
  }
 
  if (opts) Object.assign(cfg, opts)

  const response = await openai.createCompletion(cfg)
 
  let res = response.data
  let {choices} = res
  let textout = trimNewlines(choices[0].text)
  return [textout, res.usage]
}

