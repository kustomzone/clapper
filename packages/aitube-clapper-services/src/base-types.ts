import { ClapWorkflow } from "@aitube/clap"

export enum ChatEventVisibility {
  TO_ASSISTANT_ONLY = 'TO_ASSISTANT_ONLY',
  TO_USER_ONLY = 'TO_USER_ONLY',
  TO_BOTH = 'TO_BOTH',
}

export type ChatEvent = {
  eventId: string
  senderId: string
  senderName: string
  roomId: string
  roomName: string
  sentAt: string
  message: string
  isCurrentUser: boolean

  /**
   * Some message are only used for purely technical reasons,
   * and should be hidden (eg. JSON responses)
   */
  visibility: ChatEventVisibility
}

export type ChatHistory = ChatEvent[]


export enum SettingsCategory {
  NONE = "NONE",
  PROVIDER = "PROVIDER",
  ASSISTANT = "ASSISTANT",
  EDITORS = "EDITORS",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  VOICE = "VOICE",
  MUSIC = "MUSIC",
  SOUND = "SOUND"
}

export enum ComputeProvider {
  NONE = "NONE",
  CUSTOM = "CUSTOM",
  HUGGINGFACE = "HUGGINGFACE", // https://huggingface.co
  COMFY_HUGGINGFACE = "COMFY_HUGGINGFACE", // https://huggingface.co
  REPLICATE = "REPLICATE", // https://replicate.com
  COMFY_REPLICATE = "COMFY_REPLICATE", // https://replicate.com
  COMFY_COMFYICU = "COMFY_COMFYICU", // https://comfy.icu
  ELEVENLABS = "ELEVENLABS", // https://elevenlabs.io
  KITSAI = "KITSAI", // https://kits.ai
  OPENAI = "OPENAI", // https://openai.com
  STABILITYAI = "STABILITYAI", // https://stability.ai
  FIREWORKSAI = "FIREWORKSAI", // https://fireworks.ai
  GROQ = "GROQ", // https://groq.com
  ANTHROPIC = "ANTHROPIC", // https://anthropic.com
  GOOGLE = "GOOGLE", // https://google.com (in case you didn't know)
  MISTRALAI = "MISTRALAI", // https://mistral.ai
  COHERE = "COHERE", // https://cohere.com
  FALAI = "FALAI", // https://fal.ai
  MODELSLAB = "MODELSLAB", // https://modelslab.com
  MIDJOURNEY = "MIDJOURNEY",
  SUNO = "SUNO",
  UDIO = "UDIO",
  LUMALABS = "LUMALABS",
  KUAISHOU = "KUAISHOU",
  RUNWAYML = "RUNWAYML",
  HEDRA = "HEDRA",
  LEONARDOAI = "LEONARDOAI",
  EVERARTAI = "EVERARTAI",
}

export enum ComfyIcuAccelerator {
  T4 = "T4",
  L4 = "L4",
  A10 = "A10",
  A100_40GB = "A100_40GB",
  A100_80GB = "A100_80GB",
  H100 = "H100"
}

export type ResolveRequestPrompts = {
  image: {
    // the positive prompt - elements we want in the scene
    positive: string

    // the positive prompt - elements we don't want in the scene
    negative: string


    // the "identification picture" of the character, if available      
    identity: string

    // TODO: add LoRAs etc.. for location consistency
  }
  video: {
    // input image to use for the video generation
    image: string

    // input voice sample to use for the video generation
    voice: string
  }
  voice: {
    // the "identification voiceprint" of the character, if available      
    identity: string

    // the positive prompt - elements we want in the voice
    positive: string

    // the positive prompt - elements we don't want in the voice
    negative: string
  }
}

export type ComfyParameter =
  | string
  | number
  | boolean
  | Array< string | number | boolean>

export type ComfyNode = {
  inputs: Record<string, ComfyParameter>
  /*
  inputs: {
    "seed": number
    "steps": number
    "cfg": number
    "sampler_name":string
    "scheduler": string
    "denoise": number
    "model": any[]
    "positive": any[]
    "negative": any[]
    "latent_image": any[]
  }
    */
  class_type: string
  _meta: {
    title: string
  }
}

// note: they keep the high digit first in all cases
export enum FalAiImageSize {
  SQUARE_HD = "square_hd",
  SQUARE = "square",
  PORTRAIT_4_3 = "portrait_4_3",
  PORTRAIT_16_9 = "portrait_16_9",
  LANDSCAPE_4_3 = "landscape_4_3",
  LANDSCAPE_16_9 = "landscape_16_9"
}

export enum StabilityAiImageSize {
  SQUARE = "1:1",
  PORTRAIT_2_3 = "2:3",
  PORTRAIT_4_5 = "4:5",
  PORTRAIT_9_16 = "9:16",
  PORTRAIT_9_21 = "9:21",
  LANDSCAPE_3_2 = "3:2",
  LANDSCAPE_5_4 = "5:4",
  LANDSCAPE_16_9 = "16:9",
  LANDSCAPE_21_9 = "21:9"
}

export enum StabilityAiGenerationMode {
  "TEXT_TO_IMAGE" = "text-to-image",
  "IMAGE_TO_IMAGE" = "image-to-image"
}

export interface ImageSegment {
  id: number;
  box: number[];
  color: number[];
  label: string;
  score: number;
}

export type AssistantSceneSegment = {
  segmentId: number
  prompt: string
  startTimeInMs: number
  endTimeInMs: number
  category: string
}

export type AssistantStoryBlock = {
  blockId: number
  block: string
}

export type AssistantInput = {
  directorRequest: string
  storyBlocks: AssistantStoryBlock[]
  sceneSegments: AssistantSceneSegment[]
}

export enum AssistantAction {
  NONE = 'NONE',
  UPDATE_STORY_AND_SCENE = 'UPDATE_STORY_AND_SCENE',
  PLAY_VIDEO = 'PLAY_VIDEO',
  PAUSE_VIDEO = 'PAUSE_VIDEO',
  MUTE_AUDIO = 'MUTE_AUDIO',
  UNMUTE_AUDIO = 'UNMUTE_AUDIO',
  GO_BACK = 'GO_BACK',
  GO_FORWARD = 'GO_FORWARD',
  UNDO = 'UNDO',
  REDO = 'REDO',
}

export type AssistantMessage = {
  comment: string;
  action: AssistantAction;
  updatedStoryBlocks: AssistantStoryBlock[];
  updatedSceneSegments: AssistantSceneSegment[];
};


export enum ProjectCreationWizardStep {
  NONE = "NONE",
  CHOOSE_CATEGORY = "CHOOSE_CATEGORY",
  CREATE_FROM_PROMPT = "CREATE_FROM_PROMPT",
}


// note: it could be argued that image filtering and upscaling
// are both subsets of the same general concept of "image to image"
// and.. yes, that's true!
// there are only separated for convenient, to add some semantic
// to those abstract image-to-image models.
export enum WorkflowCategory {
  IMAGE_GENERATION = "IMAGE_GENERATION",
  IMAGE_FILTERING = "IMAGE_FILTERING",
  IMAGE_UPSCALING = "IMAGE_UPSCALING",
  IMAGE_DEPTH_MAPPING = "IMAGE_DEPTH_MAPPING",
  IMAGE_SEGMENTATION = "IMAGE_SEGMENTATION",
  MUSIC_GENERATION = "MUSIC_GENERATION",
  SOUND_GENERATION = "SOUND_GENERATION",
  VOICE_GENERATION = "VOICE_GENERATION",
  VIDEO_GENERATION = "VIDEO_GENERATION",
  VIDEO_FILTERING = "VIDEO_FILTERING",
  VIDEO_UPSCALING = "VIDEO_UPSCALING",
  VIDEO_DEPTH_MAPPING = "VIDEO_DEPTH_MAPPING",
  VIDEO_SEGMENTATION = "VIDEO_SEGMENTATION",
}

export type Workflow = {
  provider: ComputeProvider
  category: WorkflowCategory
  workflow: ClapWorkflow

  // used in the UI, to determine if a workflow is current active or not
  isActive?: boolean
}