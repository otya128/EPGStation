<template>
    <video ref="video" autoplay playsinline></video>
</template>

<script lang="ts">
import BaseVideo from '@/components/video/BaseVideo';
import container from '@/model/ModelContainer';
import ISnackbarState from '@/model/state/snackbar/ISnackbarState';
import { Component, Prop } from 'vue-property-decorator';
import Mpegts from 'mpegts.js';

@Component({})
export default class LiveMMTTLVVideo extends BaseVideo {
    @Prop({ required: true })
    public videoSrc!: string;

    private snackbarState: ISnackbarState = container.get<ISnackbarState>('ISnackbarState');
    private mepgtsPlayer: Mpegts.Player | null = null;

    public mounted(): void {
        super.mounted();
    }

    public async beforeDestroy(): Promise<void> {
        if (this.mepgtsPlayer !== null) {
            this.mepgtsPlayer.pause();
            this.mepgtsPlayer.unload();
            this.mepgtsPlayer.destroy();
            this.mepgtsPlayer = null;
        }

        super.beforeDestroy();
    }

    /**
     * video 再生初期設定
     */
    protected initVideoSetting(): void {
        // 対応しているか確認
        if (Mpegts.isSupported() === false || Mpegts.getFeatureList().mseLivePlayback === false) {
            this.snackbarState.open({
                color: 'error',
                text: '非対応ブラウザーです。',
            });

            throw new Error('UnsupportedBrowser');
        }

        if (this.video === null) {
            this.snackbarState.open({
                color: 'error',
                text: 'video 要素がありません。',
            });
            throw new Error('VideoIsNull');
        }
        const video = this.video;

        Mpegts.supportWorkerForMSEH265Playback().then(enableWorkerForMSE => {
            // mpegts.js の設定
            Mpegts.LoggingControl.enableVerbose = true;
            const mpegtsConfig: Mpegts.Config = {
                enableWorkerForMSE,
                enableStashBuffer: false,
                liveSync: true,
                systemClockSync: true,
                liveSyncMaxLatency: 0.7,
                liveSyncTargetLatency: 0.6,
                liveSyncMinLatency: 0.5,
                liveSyncPlaybackRate: 1.1,
            };
            this.mepgtsPlayer = Mpegts.createPlayer(
                {
                    type: 'mmttlv',
                    isLive: true,
                    url: this.videoSrc,
                },
                mpegtsConfig,
            );

            this.mepgtsPlayer.attachMediaElement(video);
            this.mepgtsPlayer.load();
            this.mepgtsPlayer.on(Mpegts.Events.AUDIO_TRACKS_METADATA, e => this.$emit('audiotracksmetadata', e));
            this.mepgtsPlayer.play();
        });
    }

    /**
     * 動画の長さを返す (秒)
     * @return number
     */
    public getDuration(): number {
        return 0;
    }

    /**
     * 動画の現在再生位置を返す (秒)
     * @return number
     */
    public getCurrentTime(): number {
        return 0;
    }

    /**
     * 再生位置設定
     * @param time: number (秒)
     */
    public setCurrentTime(time: number): void {
        return;
    }

    public selectAudioTrack(id: string): void {
        if (this.mepgtsPlayer != null) {
            this.mepgtsPlayer.switchAudioTrack(id);
        }
    }
}
</script>
