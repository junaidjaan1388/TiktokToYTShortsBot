export interface igTypes {
    data: Data
    extensions: Extensions
    status: string
  }
  
  export interface Data {
    xdt_shortcode_media: ShortcodeMedia
  }
  
  export interface ShortcodeMedia {
    __typename: string
    id: string
    shortcode: string
    dimensions: Dimensions
    gating_info: any
    fact_check_overall_rating: any
    fact_check_information: any
    sensitivity_friction_info: any
    sharing_friction_info: SharingFrictionInfo
    media_overlay_info: any
    media_preview: string
    display_url: string
    display_resources: DisplayResource[]
    accessibility_caption: any
    dash_info: DashInfo
    has_audio: boolean
    video_url: string
    video_view_count: number
    video_play_count: number
    is_video: boolean
    tracking_token: string
    upcoming_event: any
    edge_media_to_tagged_user: EdgeMediaToTaggedUser
    edge_media_to_caption: EdgeMediaToCaption
    can_see_insights_as_brand: boolean
    caption_is_edited: boolean
    has_ranked_comments: boolean
    like_and_view_counts_disabled: boolean
    edge_media_to_comment: EdgeMediaToComment
    comments_disabled: boolean
    commenting_disabled_for_viewer: boolean
    taken_at_timestamp: number
    edge_media_preview_like: EdgeMediaPreviewLike
    edge_media_to_sponsor_user: EdgeMediaToSponsorUser
    is_affiliate: boolean
    is_paid_partnership: boolean
    location: any
    nft_asset_info: any
    viewer_has_liked: boolean
    viewer_has_saved: boolean
    viewer_has_saved_to_collection: boolean
    viewer_in_photo_of_you: boolean
    viewer_can_reshare: boolean
    owner: Owner
    is_ad: boolean
    edge_web_media_to_related_media: EdgeWebMediaToRelatedMedia
    coauthor_producers: any[]
    pinned_for_users: any[]
    encoding_status: any
    is_published: boolean
    product_type: string
    title: string
    video_duration: number
    thumbnail_src: string
    clips_music_attribution_info: ClipsMusicAttributionInfo
    edge_related_profiles: EdgeRelatedProfiles
  }
  
  export interface Dimensions {
    height: number
    width: number
  }
  
  export interface SharingFrictionInfo {
    should_have_sharing_friction: boolean
    bloks_app_url: any
  }
  
  export interface DisplayResource {
    src: string
    config_width: number
    config_height: number
  }
  
  export interface DashInfo {
    is_dash_eligible: boolean
    video_dash_manifest: any
    number_of_qualities: number
  }
  
  export interface EdgeMediaToTaggedUser {
    edges: any[]
  }
  
  export interface EdgeMediaToCaption {
    edges: Edge[]
  }
  
  export interface Edge {
    node: Node
  }
  
  export interface Node {
    created_at: string
    text: string
  }
  
  export interface EdgeMediaToComment {
    count: number
    page_info: PageInfo
    edges: any[]
  }
  
  export interface PageInfo {
    has_next_page: boolean
    end_cursor: string
  }
  
  export interface EdgeMediaPreviewLike {
    count: number
    edges: any[]
  }
  
  export interface EdgeMediaToSponsorUser {
    edges: any[]
  }
  
  export interface Owner {
    id: string
    is_verified: boolean
    profile_pic_url: string
    username: string
    blocked_by_viewer: boolean
    restricted_by_viewer: any
    followed_by_viewer: boolean
    full_name: string
    has_blocked_viewer: boolean
    is_embeds_disabled: boolean
    is_private: boolean
    is_unpublished: boolean
    requested_by_viewer: boolean
    pass_tiering_recommendation: boolean
    edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia
    edge_followed_by: EdgeFollowedBy
  }
  
  export interface EdgeOwnerToTimelineMedia {
    count: number
  }
  
  export interface EdgeFollowedBy {
    count: number
  }
  
  export interface EdgeWebMediaToRelatedMedia {
    edges: any[]
  }
  
  export interface ClipsMusicAttributionInfo {
    artist_name: string
    song_name: string
    uses_original_audio: boolean
    should_mute_audio: boolean
    should_mute_audio_reason: string
    audio_id: string
  }
  
  export interface EdgeRelatedProfiles {
    edges: Edge2[]
  }
  
  export interface Edge2 {
    node: Node2
  }
  
  export interface Node2 {
    id: string
    full_name: string
    is_private: boolean
    is_verified: boolean
    profile_pic_url: string
    username: string
    edge_followed_by: EdgeFollowedBy2
    edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia2
  }
  
  export interface EdgeFollowedBy2 {
    count: number
  }
  
  export interface EdgeOwnerToTimelineMedia2 {
    count: number
    edges: Edge3[]
  }
  
  export interface Edge3 {
    node: Node3
  }
  
  export interface Node3 {
    __typename: string
    id: string
    shortcode: string
    edge_media_preview_like: EdgeMediaPreviewLike2
    edge_media_preview_comment: EdgeMediaPreviewComment
    thumbnail_src: string
    owner: Owner2
    gating_info: any
    sharing_friction_info: SharingFrictionInfo2
    media_overlay_info?: MediaOverlayInfo
    is_video: boolean
    accessibility_caption?: string
  }
  
  export interface EdgeMediaPreviewLike2 {
    count: number
  }
  
  export interface EdgeMediaPreviewComment {
    count: number
  }
  
  export interface Owner2 {
    id: string
    username: string
  }
  
  export interface SharingFrictionInfo2 {
    should_have_sharing_friction: boolean
    bloks_app_url?: string
  }
  
  export interface MediaOverlayInfo {
    banner: any
    buttons: Button[]
    description: string
    icon: Icon
    misinformation_type: any
    overlay_layout: number
    overlay_type: string
    title: string
    bloks_data: string
  }
  
  export interface Button {
    button_type: number
    text: string
    secondary_text: any
    action: number
    action_url?: string
    icon: any
    text_color: TextColor
    is_text_centered: any
    has_chevron: any
  }
  
  export interface TextColor {
    light: string
    dark: string
  }
  
  export interface Icon {
    icon_glyph: number
    icon_type: number
    name: string
    src: any
  }
  
  export interface Extensions {
    is_final: boolean
  }
  